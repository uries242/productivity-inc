import "dotenv/config"; 
import express from 'express'; 
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express(); // Create Express app
const PORT = process.env.PORT || 3000; // Set port from env or default to 3000


// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB(); 

// Use user routes
app.use('/api/users', userRoutes);

// Import and use project routes
app.use('/api/projects', projectRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`🌎 Server running on port ${PORT}`);
});