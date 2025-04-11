// PUT & DELETE /api/tasks/[taskId]
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Task from "@/models/Task";

export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    await connectToDatabase();
    const updated = await Task.findByIdAndUpdate(params.taskId, await req.json(), { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to update task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    await connectToDatabase();
    await Task.findByIdAndDelete(params.taskId);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 204 });
  } catch (error) {
    console.error("❌ Failed to delete task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
