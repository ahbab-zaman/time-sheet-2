const BonusService = require("../services/bonus.service");

exports.createBonus = async (req, res) => {
  try {
    const bonusData = req.body;

    const newBonus = await BonusService.createBonus(bonusData);

    res.status(201).json({
      message: "Bonus created successfully",
      bonus: newBonus,
    });
  } catch (error) {
    console.error("Error creating bonus:", error);
    res.status(500).json({ error: "Failed to create bonus" });
  }
};

exports.getBonuses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const bonuses = await BonusService.getBonuses(page);
    res.status(200).json(bonuses);
  } catch (error) {
    console.error("Error fetching bonuses:", error);
    res.status(500).json({ error: "Failed to fetch bonuses" });
  }
};

exports.updateBonus = async (req, res) => {
  try {
    const bonusId = req.params.id;
    const updatedData = req.body;
    const updatedBonus = await BonusService.updateBonus(bonusId, updatedData);
    res
      .status(200)
      .json({ message: "Bonus updated successfully", bonus: updatedBonus });
  } catch (error) {
    console.error("Error updating bonus:", error);
    res.status(500).json({ error: "Failed to update bonus" });
  }
};

exports.deleteBonus = async (req, res) => {
  try {
    const bonusId = req.params.id;
    await BonusService.deleteBonus(bonusId);
    res.status(200).json({ message: "Bonus deleted successfully" });
  } catch (error) {
    console.error("Error deleting bonus:", error);
    res.status(500).json({ error: "Failed to delete bonus" });
  }
};
