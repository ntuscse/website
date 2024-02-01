import moongose from "mongoose";
import * as dotenv from "dotenv";
import { ConnectionOptions } from "tls";
dotenv.config();

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017';
        const conn = await moongose.connect(mongoURL, { 
            useNewUrlParser: true,
            dbName: process.env.MONGO_DATABSE_NAME || 'challenges',
        } as ConnectionOptions);
        console.log(`MongoDB Connected: ${mongoURL}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export { connectDB as default };