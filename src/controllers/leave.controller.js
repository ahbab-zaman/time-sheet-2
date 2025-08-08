const leaveService = require("../services/leave.service");

exports.createLeave = async (req, res) => {
  try {
    const { employeeName, leaveType, fromDate, toDate, reason, attachment, createdBy } = req.body;

    if (!employeeName || !leaveType || !fromDate || !toDate || !reason || !createdBy) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const leave = await leaveService.createLeave({
      employeeName,
      leaveType,
      fromDate,
      toDate,
      reason,
      attachment: attachment || null,
      createdBy // from auth middleware
    });

    return res.status(201).json({
      message: "Leave request submitted successfully",
      leave,
    });
  } catch (error) {
    console.error("Error creating leave:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const { count, rows } = await leaveService.getAllLeaves(page, limit);

    res.status(200).json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      leaves: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaves", error: error.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await leaveService.updateLeave(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave updated successfully", leave: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave", error: error.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await leaveService.deleteLeave(id);

    if (!deleted) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete leave", error: error.message });
  }
};

