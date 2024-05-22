import mongoose from "mongoose";
import { z } from "zod";

export const getEmailPrefix = (email: string) => {
  return email.replace(/@.*$/, "");
};

export const isValidDate = (d: Date) => {
  return d instanceof Date && !isNaN(d.valueOf());
};

// Helper zod function to validate ObjectId
export const zodIsValidObjectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Helper zod function to validate ObjectId
export const zodGetValidObjectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const zodIsValidRFC3339 = z
  .string()
  .refine((val) => new Date(val).toISOString() === val, {
    message: "Invalid RFC3339 date",
  });

export const isValidCreateSubmissionRequest = z.object({
  user: zodIsValidObjectId,
  question: zodIsValidObjectId,
  answer: z.string(),
});

export const isValidEmail = z.string().min(1).email();

export const isValidQuestionRequest = z.object({
  question_no: z.string(),
  question_title: z.string(),
  question_desc: z.string(),
  question_date: zodIsValidRFC3339,
  season_id: zodIsValidObjectId,
  expiry: zodIsValidRFC3339,
  points: z.number().int(),
  validation_function: z.string(),
  generate_input_function: z.string(),
});

export const isPositiveInteger = z.number().int().min(1);

export const isNonNegativeInteger = z.number().int().min(0);
