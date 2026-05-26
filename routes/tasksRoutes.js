import { Router } from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import authenticateToken from "../utils/auth.js";

const router = Router();

router.use(authenticateToken);

// POST /api/projects/:projectId/tasks (Creates a new task for a specific project)
router.post("/:projectId/tasks", async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }
        const task = await Task.create({ ...req.body, project: req.params.projectId });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/projects/:projectId/tasks (Gets all tasks for a specific project)
router.get("/:projectId/tasks", async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/projects/:projectId/tasks/:taskId (Updates a specific task by ID for a specific project)
router.put("/tasks/:taskId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ error: "Task not found" });
        const project = await Project.findById(task.project);
        if (!project) return res.status(404).json({ error: "Project not found" });
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/projects/:projectId/tasks/:taskId (Deletes a specific task by ID for a specific project)
router.delete("/tasks/:taskId", async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ error: "Task not found" });
        const project = await Project.findById(task.project);
        if (!project) return res.status(404).json({ error: "Project not found" });
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;