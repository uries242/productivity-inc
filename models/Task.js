import { Schema, model } from "mongoose"; // Imported & destructured 'Schema' and 'model' from Mongoose for schema definition and model creation


const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"], 
    default: "To Do",
  }, 
  
  // This field will store the ObjectId reference to the associated Project
  project: {
    type: Schema.Types.ObjectId, 
    ref: "Project",
    required: true,
  },

});

const Task = model("Task", taskSchema);

export default Task;
