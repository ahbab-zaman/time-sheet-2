const BankDetailsService = require("../services/bankDetails.service");

exports.addBankDetails = async (req, res) => {
  try {
    const data = req.body;
    // Validate required fields
    const requiredFields = [
      "employee_id",
      "bank_name",
      "account_number",
      "ifsc_code",
      "account_holder_name",
    ];
    for (let field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const bankDetails = await BankDetailsService.addBankDetails(data);
    res.status(201).json(bankDetails);
  } catch (error) {
    console.error("Error adding bank details:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to add bank details" });
  }
};

exports.getBankDetails = async (req, res) => {
  try {
    const bankDetails = await BankDetailsService.getBankDetails();
    res.status(200).json({ bankDetails });
  } catch (error) {
    console.error("Error fetching bank details:", error);
    res.status(500).json({ error: "Failed to fetch bank details" });
  }
};

exports.updateBankDetails = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const data = req.body;

    if (!employee_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const updated = await BankDetailsService.updateBankDetails(
      employee_id,
      data
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating bank details:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update bank details" });
  }
};

exports.deleteBankDetails = async (req, res) => {
  try {
    const { employee_id } = req.params;

    if (!employee_id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    await BankDetailsService.deleteBankDetails(employee_id);
    res.status(200).json({ message: "Bank details deleted successfully" });
  } catch (error) {
    console.error("Error deleting bank details:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to delete bank details" });
  }
};
