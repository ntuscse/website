import mongoose from 'mongoose';
import { z } from 'zod';

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}

// Helper zod function to validate ObjectId
const paramsSchema = z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val), 
    { message: 'Invalid ObjectId' }
);

export { isValidObjectId, paramsSchema };