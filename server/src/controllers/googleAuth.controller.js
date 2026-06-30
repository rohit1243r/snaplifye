import Client from "../models/client.model.js";
import generateToken from "../utils/generateToken.js";

export const googleLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Access token is required.",
      });
    }

    let userInfo;
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!response.ok) {
        return res.status(401).json({
          success: false,
          message: "Invalid Google token.",
        });
      }

      userInfo = await response.json();
    } catch (fetchErr) {
      return res.status(401).json({
        success: false,
        message: "Failed to verify Google token.",
      });
    }

    if (!userInfo || !userInfo.email) {
      return res.status(400).json({
        success: false,
        message: "Failed to get user info from Google.",
      });
    }

    const { sub: googleId, email, name, picture } = userInfo;

    let client = await Client.findOne({ $or: [{ googleId }, { email }] });

    if (client) {
      if (!client.googleId) {
        client.googleId = googleId;
        client.provider = "google";
        client.picture = picture || client.picture;
        if (name && !client.name) client.name = name;
        await client.save();
      }
    } else {
      client = await Client.create({
        name: name || email.split("@")[0],
        email,
        googleId,
        picture: picture || "",
        provider: "google",
        password: "",
      });
    }

    const token = generateToken({ id: client._id, role: "client" });

    res.json({
      success: true,
      message: "Google login successful.",
      token,
      client,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error.",
    });
  }
};
