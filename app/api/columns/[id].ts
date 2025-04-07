import { connectToDatabase } from "@/lib/mongoose";
import Column  from "@/models/Column";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === "PUT") {
    const updated = await Column.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await Column.findByIdAndDelete(id);
    return res.status(204).end();
  }
}
