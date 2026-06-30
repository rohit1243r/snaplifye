import Project from "../models/project.model.js";
import Contact from "../models/contact.model.js";
import Quote from "../models/quote.model.js";

export const getStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalClients = await Contact.distinct("email");
    const ratingResult = await Project.aggregate([
      { $match: { rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" }, totalRatings: { $sum: "$ratingsCount" } } },
    ]);

    const avgRating = ratingResult.length > 0 ? ratingResult[0].avgRating : 0;
    const totalRatings = ratingResult.length > 0 ? ratingResult[0].totalRatings : 0;

    res.status(200).json({
      success: true,
      data: {
        projects: totalProjects,
        clients: totalClients.length,
        rating: avgRating > 0 ? parseFloat(avgRating.toFixed(1)) : 0,
        ratingsCount: totalRatings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
