import Client from "../models/client.model.js";
import generateToken from "../utils/generateToken.js";
import { sanitize, validateRegisterInput } from "../utils/validate.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const validationErrors = validateRegisterInput({ name, email, password });
    if (validationErrors) {
      return res.status(400).json({
        success: false,
        message: Object.values(validationErrors).join(". "),
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailExists = await Client.findOne({ email: normalizedEmail });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    if (phone) {
      const phoneExists = await Client.findOne({ phone });
      if (phoneExists) {
        return res.status(409).json({
          success: false,
          message: "User already exists. Please login.",
        });
      }
    }

    const client = await Client.create({
      name: sanitize(name),
      email: normalizedEmail,
      password,
      phone: phone || "",
    });

    const token = generateToken({ id: client._id, role: "client" });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      client,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const client = await Client.findOne({ email: email.toLowerCase().trim() });
    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!client.password) {
      return res.status(401).json({
        success: false,
        message: "This account uses Google sign-in. Please use Google login.",
      });
    }

    const isMatch = await client.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken({ id: client._id, role: "client" });

    res.json({
      success: true,
      message: "Login successful.",
      token,
      client,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error.",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found.",
      });
    }
    res.json({ success: true, client });
  } catch (error) {
    console.error("GetProfile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, company, avatar, password } = req.body;

    const client = await Client.findById(req.clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found.",
      });
    }

    if (name) client.name = sanitize(name);
    if (phone !== undefined) client.phone = sanitize(phone);
    if (company !== undefined) client.company = sanitize(company);
    if (avatar !== undefined) client.avatar = avatar;
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters.",
        });
      }
      client.password = password;
    }

    await client.save();

    res.json({
      success: true,
      message: "Profile updated.",
      client,
    });
  } catch (error) {
    console.error("UpdateProfile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error.",
    });
  }
};
