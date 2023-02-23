import express from "express";
import payload from "payload";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// expose public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    // eslint-disable-nexßt-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here

app.listen(process.env.PAYLOAD_PUBLIC_SERVER_PORT);
