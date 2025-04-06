import { connectToDatabase } from "@/lib/mongodb";
import Column from "@/models/Column";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newColumn = await Column.create({ title: body.title });
  return Response.json(newColumn);
}
