const express = require("express");
const bonusController = require("../controllers/bonus.controller");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const bonusRouter = express.Router();

// Allocate bonus — accessible by authenticated users with appropriate role
bonusRouter.post("/allocate", authenticate, bonusController.createBonus);

// Get all bonuses — accessible by admins only
bonusRouter.get("/", authenticate, bonusController.getBonuses);

// Update a bonus — accessible by admins only
bonusRouter.patch("/:id", authenticate, isAdmin, bonusController.updateBonus);

// Delete a bonus — accessible by admins only
bonusRouter.delete("/:id", authenticate, isAdmin, bonusController.deleteBonus);

module.exports = bonusRouter;
