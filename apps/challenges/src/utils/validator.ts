import mongoose from 'mongoose';
import { z } from 'zod';

export const isValidDate = (d: Date) => {
    return d instanceof Date && !isNaN(d.valueOf())
}

// Helper zod function to validate ObjectId
export const zodIsValidObjectId = z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: 'Invalid ObjectId' }
);

export const isPositiveInteger = z.number().int().min(1);

export const isNonNegativeInteger = z.number().int().min(0);