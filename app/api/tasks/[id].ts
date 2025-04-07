import { connectToDatabase } from "@/lib/mongoose";
import Task  from "@/models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await Task.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
