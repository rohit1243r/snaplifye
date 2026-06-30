import FAQ from "../models/faq.model.js";

export const getPublicFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllFAQs = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      filter.question = { $regex: search, $options: "i" };
    }
    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: faqs, total: faqs.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;
    if (!question || !answer || !category) {
      return res.status(400).json({ success: false, message: "Question, answer and category are required." });
    }
    const faq = await FAQ.create({ question, answer, category, order });
    res.status(201).json({ success: true, message: "FAQ created successfully.", data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res.json({ success: true, message: "FAQ updated successfully.", data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res.json({ success: true, message: "FAQ deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
