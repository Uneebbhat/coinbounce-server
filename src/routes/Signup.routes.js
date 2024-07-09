import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";

config();

const route = Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

route.post(
  "/v1/signup",
  upload.single("profilePic"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      if (!name || !email || !password) {
        return res
          .status(403)
          .json({ success: false, message: "All fields are required!" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(403)
          .json({ success: false, message: "User already exists" });
      }

      const hashPass = await bcrypt.hash(password, 10);

      let profilePicUrl = null;
      if (req.file) {
        const result = await cloudinaryUpload(req.file.path, {
          folder: "profilePic",
        });
        profilePicUrl = result.secure_url;
      }

      // Determine role based on email domain
      let role = "user"; // Default role
      if (email.endsWith("@admin.com")) {
        role = "admin";
      }

      const newUser = await User.create({
        profilePic: profilePicUrl,
        email,
        name,
        password: hashPass,
        role,
      });

      if (newUser) {
        const token = jwt.sign(
          {
            userId: newUser._id,
            name: newUser.name,
            userImg: newUser.profilePic,
            role: newUser.role, // Include role in JWT payload
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.status(201).json({ success: true, newUser, token });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "An error occurred" });
      }
    } catch (e) {
      console.error("Error signing up:", e);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default route;
