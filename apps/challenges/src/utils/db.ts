import mongoose from 'mongoose';

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}

export { isValidObjectId };