import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "NONE"],
    default: "LOW",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column", // Dynamic column reference
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
