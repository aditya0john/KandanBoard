import { connectToDatabase } from "@/lib/mongoose";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("📩 Incoming GET /api/tasks");

  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected");

    const tasks = await Task.find();
    console.log("📦 Found columns:", tasks);

    return NextResponse.json(tasks, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in GET /api/tasks:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
