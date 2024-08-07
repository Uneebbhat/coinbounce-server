import { Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

const route = Router();

config();

route.post(
  "/v1/login",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      if (!email || !password) {
        return res
          .status(403)
          .json({ success: false, message: "All fields are required!" });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Determine role based on email domain
      let role = "user"; // Default role
      if (email.endsWith("@admin.com")) {
        role = "admin";
      }

      const token = jwt.sign(
        {
          userId: existingUser._id,
          name: existingUser.name,
          userImg: existingUser.profilePic,
          role: role, // Include role in JWT payload
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ success: true, existingUser, token });
    } catch (e) {
      console.error("Error signing in:", e);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default route;
