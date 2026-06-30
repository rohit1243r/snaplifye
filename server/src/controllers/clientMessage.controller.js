import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const clientId = req.clientId;
    const messages = await Message.find({ clientId }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const clientId = req.clientId;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required.",
      });
    }

    const message = await Message.create({
      clientId,
      sender: "client",
      text,
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const clientId = req.clientId;
    await Message.updateMany(
      { clientId, sender: "admin", read: false },
      { read: true }
    );

    res.json({ success: true, message: "Messages marked as read." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
