const db = require('../config/sequelize');
const Project = db.Project

exports.createProject = async (data) => {
  return await Project.create(data);
};

exports.getAllProjects = async () => {
  const projects = await Project.findAll();
  return {
    total: projects.length,
    projects,
  };
};

exports.updateProjectById = async (id, data) => {
  const project = await Project.findByPk(id);
  if (!project) return null;
  await project.update(data);
  return project;
};

exports.deleteProjectById = async (id) => {
  const deletedCount = await Project.destroy({
    where: { id },
  });
  return deletedCount > 0; // returns true if deleted, false if not found
};