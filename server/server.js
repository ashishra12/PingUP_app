import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { inngest ,functions} from "./inngest/index.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'

dotenv.config(); // ✅ Load environment variables from .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware()); // ✅ Add Clerk middleware
// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB(); // ✅ This now works inside async function
    console.log("✅ MongoDB connected successfully!");

    // Routes
    app.get("/", (req, res) => {
      res.send("Server is running successfully.");
    });
    app.use("/api/inngest", serve({ client: inngest, functions }));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop the process if DB connection fails
  }
};

startServer();
