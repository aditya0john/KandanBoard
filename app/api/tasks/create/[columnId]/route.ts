// POST /api/tasks/[columnId]
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Task from "@/models/Task";

export async function POST(req: NextRequest, { params }: { params: { columnId: string } }) {
  try {
    await connectToDatabase();

    const columnId = params.columnId;
    const body = await req.json();
    const { title, description, dueDate, priority } = body;

    if (!title || !description || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || "LOW",
      columnId,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
