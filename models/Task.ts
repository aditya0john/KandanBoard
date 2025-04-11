import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  priority: { type: String },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
