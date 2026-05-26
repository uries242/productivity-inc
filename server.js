import "dotenv/config"; 
import express from 'express'; 
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
const uri = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri)
.then(() => console.log("MongoDB connected")) 
.catch((err) => console.error("MongoDB connection error:", err));

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});