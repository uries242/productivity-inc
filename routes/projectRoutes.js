import { Router } from "express";
import Project from "../models/Project.js";
import authenticateToken from "../utils/auth.js"; 

const router = Router(); 

router.use(authenticateToken);  // MDW to protect all routes in this file automatically. No need to add it individually

// POST /api/projects - (To create a new project)
router.post("/", async (req, res) => {
    try {
        const project = await Project.create({ ...req.body, user: req.user.id });
        res.status(201).json(project);    
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/projects - (To get ALL projects for the authenticated/logged-in user)
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/projects/:id - (To get a specific project by ID for the authenticated/logged-in user)
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); 
        if (!project) return res.status(404).json({ error: "Project not found" }); // Check if project exists
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" }); // Check if project belongs to the authenticated user
        }
        res.json(project); // Return the project if found and belongs to the user
    }
    catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// PUT /api/projects/:id - (To update a specific project by ID for the authenticated/logged-in user)
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); 
        if (!project) return res.status(404).json({ error: "Project not found" }); // Check if project exists
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" }); // Check if project belongs to the authenticated user
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the project with new data
        res.json(updatedProject); // Return the updated project
    }
    catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// DELETE /api/projects/:id - (To delete a specific project by ID for the authenticated/logged-in user)
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); 
        if (!project) return res.status(404).json({ error: "Project not found" }); // Check if project exists
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" }); // Check if project belongs to the authenticated user
        }
        await Project.findByIdAndDelete(req.params.id); // Delete the project
        res.json({ message: "Project deleted successfully" }); // Return success message
    }
    catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


export default router;
    