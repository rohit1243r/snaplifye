import Client from "../models/client.model.js";
import Project from "../models/project.model.js";
import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";
import Message from "../models/message.model.js";

export const getClients = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    const clients = await Client.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, clients });
  } catch (error) {
    console.error("getClients error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found." });
    }

    const projects = await Project.find({ assignedClient: id }).sort({ createdAt: -1 });

    const messages = await Message.find({ clientId: id }).sort({ createdAt: 1 });

    const invoices = await Invoice.find({ clientId: id }).sort({ createdAt: -1 });

    const payments = await Payment.find({ clientId: id }).sort({ createdAt: -1 });

    const unreadCount = messages.filter((m) => m.sender === "client" && !m.read).length;

    res.json({
      success: true,
      client,
      projects,
      messages,
      invoices,
      payments,
      unreadCount,
    });
  } catch (error) {
    console.error("getClientById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Text is required." });
    }

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found." });
    }

    const message = await Message.create({
      clientId: id,
      sender: "admin",
      text,
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markMessagesRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.updateMany(
      { clientId: id, sender: "client", read: false },
      { read: true }
    );
    res.json({ success: true, message: "Messages marked as read." });
  } catch (error) {
    console.error("markMessagesRead error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, dueDate, description } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found." });
    }

    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${String(count + 1).padStart(4, "0")}`;

    const invoice = await Invoice.create({
      clientId: id,
      invoiceNumber,
      amount,
      dueDate,
      description,
    });

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    console.error("createInvoice error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id, invoiceId } = req.params;
    const { status } = req.body;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: invoiceId, clientId: id },
      { status },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found." });
    }

    res.json({ success: true, invoice });
  } catch (error) {
    console.error("updateInvoice error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, method, transactionId, invoiceId } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found." });
    }

    const payment = await Payment.create({
      clientId: id,
      amount,
      method,
      transactionId,
      invoiceId,
    });

    if (invoiceId) {
      await Invoice.findByIdAndUpdate(invoiceId, { status: "paid" });
    }

    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error("recordPayment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id, projectId } = req.params;
    const updates = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, assignedClient: id },
      updates,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, project });
  } catch (error) {
    console.error("updateProject error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { assignedClient: id },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({ success: true, project });
  } catch (error) {
    console.error("assignProject error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
