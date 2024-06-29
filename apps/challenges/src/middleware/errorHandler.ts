import { NextFunction, Request, Response } from "express";
import { StatusCodeError } from "../types/types";
import { z } from "zod";
import { Logger } from "nodelogger";

// ExpressErrorHandler define a default error handling middleware
// which return error responses based on the error type forwarded from controllers.
// The consensus we reached before is that this middleware is only for catching uncaught errors,
// and errors should still be caught in controller layer and return response in controller layer if possible.
// The reason is that we should handle the error as closer to the error as possible
// More discussion on https://www.reddit.com/r/node/comments/18ukkyc/whats_the_best_way_to_handle_errors_in_expressjs/
export const ExpressErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log errors if caught
  Logger.warn(
    "Default error handler is called. We should throw error in controller layer as much as possible instead of relying on middleware. Check src/middlware/errorHandler.ts for more information."
  );
  Logger.error(
    "default ExpressErrorHandler error",
    err,
    err instanceof Error ? err.stack : undefined
  );

  // If the headers have already sent to the client but there is error when writing the response
  // We must pass the error to express default error handler to close the connection and fail the request
  // Refer to https://expressjs.com/en/guide/error-handling.html#:~:text=If%20you%20call,to%20the%20client%3A
  if (res.headersSent) {
    return next(err);
  }
  // We check the error status type, and return a default error response based on it
  // Refers to https://stackoverflow.com/a/54286277
  return ErrorHandling(err, res);
};

// ErrorHandling consists of a common logic for responding to errors. 
// This is done to reduce repeated code.
// REMINDER: 
// we SHOULD NOT add any custom error handling logic (that will be only used in one endpoint)
// in this common error handling function to avoid this function being a god function.
//
// NOTES: (For advanced express user)
// You might argue that error is going to pass to here anyway if the error is uncaught in the controller / service / repository layer
// Hence controller layer dont need to do the try catch, instead, just let error handling middleware to catch all the errors.
// But this is done to provide better logging + enforce how custom error response should be handled + prevent ambiguity/
//
// 1. Better logging:
// By catching the error at controller layer (or as close to where the error is thrown)
// We can log the error as close to where the error happen as possible.
// This will greatly help with debuggging.
// 
// 2. Enforce how custom error response should be handled:
// There might be scenarios where some endpoint would want to return a customised error response body
// instead of a general one. In that scenario, we should definitely throw it in controller layer, instead of 
// modifying error handler middleware to handle that, since it would make error handler middleware to 
// become super fat to handle all those different logic. Error handler middleware will literally become 
// a god function, which is very bad.
//
// By enforcing that error handling logic should be done in controller layer, we would encourage 
// developers to keep the custom error handling logic in controller layer instead of this common error handling function.
// 
// 3. Ambuigity:
// If one is not familiar with Express, you would find out that when there is an uncaught error 
// the error middleware will be called, but it is not mentioned anywhere in the code 
// It would looks like magic to beginner, which is not very beginner friendly.
export const ErrorHandling = (err: unknown, res: Response) => {
  switch (true) {
    case err instanceof StatusCodeError:
      res
        .status((err as StatusCodeError).status)
        .json({ message: (err as StatusCodeError).message });
      break;
    case err instanceof z.ZodError:
      // We assume all zod error is validation error, hence we return 400 status code

      // Block-scope is needed since lexical declaration in switch case will leak to other case
      // Refer to https://docs.datadoghq.com/code_analysis/static_analysis_rules/javascript-best-practices/no-case-declarations/
      // Refer to https://gist.github.com/BoonHianLim/608462a5a83231391b6c3d2a4ef0d8c5 for short example
      {
        const message = (err as z.ZodError).issues
          .map((issue) => issue.message)
          .join(", ");
        res.status(400).json({ message });
      }

      break;
    case err instanceof Error:
      res.status(500).json({ message: (err as Error).message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};
