import mongoose, { Schema, Document } from 'mongoose';

export interface UserModel {
    name: string;
    email: string;
    active: boolean;
}

const questionSchema: Schema<UserModel> = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model<UserModel>('User', questionSchema);