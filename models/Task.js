import { status } from "init";
import { Schema, model } from "mongoose";

const mongoose = require("mongoose"); // Import Mongoose for schema definition
const { Schema } = mongoose;          // Destructure Schema from Mongoose for easier access

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true },

  description: {
    type: String,
    trim: true },

  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
