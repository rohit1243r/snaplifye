import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "../src/config/db.js";
import Admin from "../src/models/admin.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const exists = await Admin.findOne({
      email: "snaplifyelimitedcompany@gmail.com",
    });

    if (exists) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      name: "Rohit Kumar",
      email: "snaplifyelimitedcompany@gmail.com",
      password: hashedPassword,
    });

    console.log("🎉 Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();