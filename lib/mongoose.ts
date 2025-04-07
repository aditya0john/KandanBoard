import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  try {
    console.log("✅ Connected to MongoDB");
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
