import { NextFunction, Request, Response } from "express";
import { StatusCodeError } from "../types/types";
import { z } from "zod";

// ExpressErrorHandler define a default error handling middleware
// which return error responses based on the error type forwarded from controllers.
// This middleware is only for catching uncaught errors, and errors should still be caught in controller layer and response in controller layer if possible.
// This is as we should handle the error as closer to the error as possible
// The reason for this can refer to 
export const ExpressErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the headers have already sent to the client but there is error when writing the response
  // We must pass the error to express default error handler to close the connection and fail the request
  // Refer to https://expressjs.com/en/guide/error-handling.html#:~:text=If%20you%20call,to%20the%20client%3A
  if (res.headersSent) {
    return next(err);
  }
  // We check the error status type, and return a default error response based on it
  // Refers to https://stackoverflow.com/a/54286277
  ErrorHandling(err, res);
};

// ErrorHandling consists of a common logic that 
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
        res.status(400).json({ message: message });
      }

      break;
    case err instanceof Error:
      res.status(500).json({ message: (err as Error).message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};
