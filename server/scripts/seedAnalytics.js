import dotenv from "dotenv";
import mongoose from "mongoose";
import Visitor from "../src/models/visitor.model.js";
import Testimonial from "../src/models/testimonial.model.js";

dotenv.config();

const seedAnalytics = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // Seed visitor count
    const existingVisitor = await Visitor.findOne();
    if (!existingVisitor) {
      await Visitor.create({ count: 1250 });
      console.log("✅ Visitor count seeded: 1250");
    } else {
      console.log("ℹ️ Visitor count already exists:", existingVisitor.count);
    }

    // Seed testimonials
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      const testimonials = [
        { name: "Rahul Sharma", company: "TechStart", content: "Snaplifye built an amazing website for our startup. The design is modern and the performance is outstanding!", rating: 5 },
        { name: "Priya Patel", company: "Bloom Cosmetics", content: "Our e-commerce store looks beautiful and runs smoothly. Highly recommended!", rating: 5 },
        { name: "Amit Singh", company: "Singh & Associates", content: "Professional team, on-time delivery, and excellent support. Couldn't ask for more.", rating: 4 },
        { name: "Neha Gupta", company: "FitLife Gym", content: "The website has helped us get 3x more members. Amazing work by the Snaplifye team!", rating: 5 },
      ];
      await Testimonial.insertMany(testimonials);
      console.log(`✅ ${testimonials.length} testimonials seeded`);
    } else {
      console.log(`ℹ️ ${existingTestimonials} testimonials already exist`);
    }

    await mongoose.disconnect();
    console.log("👋 Done");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAnalytics();
