import { Hono } from "hono";
import { auth } from "./routes/authRoutes";
import mongoose from "mongoose";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import "dotenv/config";
import { scholarships } from "./routes/scholarshipRoutes";
import { user } from "./routes/userRoutes";

const app = new Hono();

// Middlewares
app.use(cors());
app.use(logger());

// Routes
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/auth", auth);
app.route("/user", user);
app.route("/scholarships", scholarships);

// Connect to MongoDB
const dbUri = process.env.DB_URI;
if (!dbUri) {
  throw new Error("DB_URI environment variable is not defined");
}

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;
