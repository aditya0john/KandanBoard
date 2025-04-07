// models/Column.ts
import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);
