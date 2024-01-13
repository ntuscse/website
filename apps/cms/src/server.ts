import express from "express";
import payload from "payload";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();

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
// app.use('/api/orders', orderRouter);

app.listen(process.env.PAYLOAD_PUBLIC_SERVER_PORT);
