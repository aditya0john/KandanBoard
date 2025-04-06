// models/Column.ts
import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);
