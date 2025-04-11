// app/api/columns/[id]/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import Column from "@/models/Column";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    await Column.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("❌ Delete column failed:", error);
    return NextResponse.json(
      { error: "Failed to delete column" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const updated = await Column.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Update column failed:", error);
    return NextResponse.json(
      { error: "Failed to update column" },
      { status: 500 }
    );
  }
}
