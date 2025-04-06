import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newTask = await Task.create(body);
  return Response.json(newTask);
}
