import Project from "../models/project.model.js";
import Message from "../models/message.model.js";
import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

export const getDashboard = async (req, res) => {
  try {
    const clientId = req.clientId;

    const projects = await Project.find({ assignedClient: clientId }).sort({
      createdAt: -1,
    });

    const invoices = await Invoice.find({ clientId }).sort({ createdAt: -1 });

    const payments = await Payment.find({ clientId }).sort({ createdAt: -1 });

    const messages = await Message.find({ clientId }).sort({ createdAt: -1 });

    const activeProjects = projects.filter(
      (p) => p.status !== "completed" && p.status !== "cancelled"
    ).length;

    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;

    const pendingPayments = invoices
      .filter((inv) => inv.status === "pending" || inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const unreadMessages = messages.filter((m) => m.sender === "admin" && !m.read).length;

    const response = {
      stats: {
        activeProjects,
        completedProjects,
        pendingPayments,
        supportTickets: 0,
        upcomingMeetings: 0,
        unreadMessages,
      },
      projects,
      invoices,
      payments,
    };

    res.json({ success: true, ...response });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
