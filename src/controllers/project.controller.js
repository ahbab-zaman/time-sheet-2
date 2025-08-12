const projectService = require("../services/project.service");

exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const result = await projectService.getAllProjects();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProjectById = async (req, res) => {
  try {
    const updatedProject = await projectService.updateProjectById(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProjectById = async (req, res) => {
  try {
    const deleted = await projectService.deleteProjectById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

