import mongoose from 'mongoose';
import { z } from 'zod';

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}

export { isValidObjectId };