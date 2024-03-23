import mongoose, { Schema } from 'mongoose';

export interface TokenModel {
    _id: mongoose.Types.ObjectId;
    jwt: string;
    userID: mongoose.Types.ObjectId;
    expiry: Date;
}

const tokenSchema: Schema<TokenModel> = new Schema({
    jwt: {
        type: String,
        unique: true,
    },
    expiry: {
        type: Date,
        required: [true, 'Please add a expiry date']
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user ID']
    },
}, {
    timestamps: true
})

const Token = mongoose.model<TokenModel>('Token', tokenSchema);

export { Token as default }