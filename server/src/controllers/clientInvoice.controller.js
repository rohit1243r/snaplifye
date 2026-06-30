import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

export const getInvoices = async (req, res) => {
  try {
    const clientId = req.clientId;
    const invoices = await Invoice.find({ clientId }).sort({ createdAt: -1 });

    res.json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const clientId = req.clientId;
    const payments = await Payment.find({ clientId }).sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
