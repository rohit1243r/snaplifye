import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../src/models/project.model.js";

dotenv.config();

const seedRatings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    const projects = await Project.find();

    if (projects.length === 0) {
      console.log("No projects found to rate.");
      await mongoose.disconnect();
      return;
    }

    const ratings = [
      { rating: 4.8, ratingsCount: 24 },
      { rating: 4.9, ratingsCount: 32 },
      { rating: 4.7, ratingsCount: 18 },
      { rating: 5.0, ratingsCount: 45 },
      { rating: 4.6, ratingsCount: 12 },
      { rating: 4.9, ratingsCount: 28 },
    ];

    for (let i = 0; i < projects.length; i++) {
      const r = ratings[i % ratings.length];
      await Project.findByIdAndUpdate(projects[i]._id, {
        rating: r.rating,
        ratingsCount: r.ratingsCount,
      });
      console.log(`✅ ${projects[i].title} → ${r.rating}★ (${r.ratingsCount} ratings)`);
    }

    console.log(`\n🎯 ${projects.length} projects rated successfully!`);
    await mongoose.disconnect();
    console.log("👋 Disconnected");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedRatings();
