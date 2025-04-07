// app/api/columns/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import Column from "@/models/Column";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("📩 Incoming GET /api/columns");

  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected");

    const columns = await Column.find();
    console.log("📦 Found columns:", columns);

    return NextResponse.json(columns, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error in GET /api/columns:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const { title, color, userId } = body;

  if (!userId) {
    return NextResponse.json({ message: " Missing userId " }, { status: 400 });
  }

  const newColumn = await Column.create({ title, color, userId });
  return NextResponse.json(newColumn, { status: 201 });
}
