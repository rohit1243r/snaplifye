import Quote from "../models/quote.model.js";

export const createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);

    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully.",
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};