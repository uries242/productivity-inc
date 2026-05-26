import { Schema, model } from 'mongoose';

// Define the Project schema
const projectSchema = new Schema({ 
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
 { timestamps: true });

const Project = model('Project', projectSchema); // Creates the Project model

export default Project;