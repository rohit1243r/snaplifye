import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../src/config/db.js";
import Admin from "../src/models/admin.model.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "snaplifyelimitedcompany@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Rohit Kumar";

const createAdmin = async () => {
  try {
    await connectDB();

    const exists = await Admin.findOne({
      email: ADMIN_EMAIL,
    });

    if (exists) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
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