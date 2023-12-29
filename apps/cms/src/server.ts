import express from "express";
import payload from "payload";
import * as dotenv from "dotenv";
import path from "path";
import orderRouter from "./orders.router";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

// connecting to mongodb
// it ensures that values passed to a model's constructor that were not specified in the schema also gets saved to the database.
mongoose.set('strictQuery', false)

// attempt to connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// expose public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Initialize Payload
void payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// use json
app.use(express.json());


// Add your own express routes here 
// Routes are added into orders.router.ts
app.use('/api/orders', orderRouter);

app.listen(process.env.PAYLOAD_PUBLIC_SERVER_PORT);
