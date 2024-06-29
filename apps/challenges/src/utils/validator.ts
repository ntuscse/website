import mongoose from "mongoose";
import { z } from "zod";

export const getEmailPrefix = (email: string) => {
  return email.replace(/@.*$/, "");
};

export const isValidDate = (d: Date) => {
  return d instanceof Date && !isNaN(d.valueOf());
};

// Helper zod function to validate ObjectId
export const zodIsValidObjectId = (errMsg: string) => {
  return z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: errMsg,
  });
};

// Helper zod function to validate ObjectId
export const zodGetValidObjectId = (errMsg: string) => {
  return z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: errMsg,
    })
    .transform((val) => new mongoose.Types.ObjectId(val));
};

export const zodIsValidRFC3339 = z
  .string()
  .refine((val) => new Date(val).toISOString() === val, {
    message: "Invalid RFC3339 date",
  });

export const isValidCreateSubmissionRequestBody = z.object({
  question: zodIsValidObjectId("Invalid question id"),
  answer: z.string(),
});

export const isValidEmail = z.string().min(1).email();

export const isValidQuestionRequest = z.object({
  question_no: z.string(),
  question_title: z.string(),
  question_desc: z.string(),
  question_date: zodIsValidRFC3339,
  season_id: zodIsValidObjectId("Invalid season id"),
  expiry: zodIsValidRFC3339,
  points: z.number().int(),
  validation_function: z.string(),
  generate_input_function: z.string(),
  active: z.boolean(),
});

export const isPositiveInteger = z.number().int().min(1);

export const isNonNegativeInteger = z.number().int().min(0);

export const isValidPaginationRequest = z
  .object({
    page: z.coerce.number().int().min(0).optional(),
    limit: z.coerce.number().int().min(1).optional(),
  })
  .refine(
    // page and limit must either both exist or both not exist
    (data) =>
      ((data.page || data.page === 0) && data.limit) ||
      (!data.page && data.page !== 0 && !data.limit),
    { message: "page and limit must either both exist or both missing" }
  );
