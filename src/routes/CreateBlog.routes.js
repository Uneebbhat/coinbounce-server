import { Router } from "express";
import { config } from "dotenv";
import multer from "multer";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/Blog.model.js";
import authentication from "../middleware/authentication.middleware.js";
import jwt from "jsonwebtoken";

const route = Router();
const upload = multer({ dest: "uploads/" });

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

route.post(
  "/create-blog",
  upload.single("blogImg"),
  authentication,
  async (req, res) => {
    const { blogTitle, blogDesc } = req.body;
    const { user } = req.user;

    if (!blogTitle || !blogDesc) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    console.log(req.file);
    let blogImgUrl = null;
    if (req.file) {
      const result = await cloudinaryUpload(req.file.path, {
        folder: "blogImg",
      });
      blogImgUrl = result.secure_url;
    }

    try {
      const blog = await Blog.create({
        blogTitle,
        blogDesc,
        blogImg: blogImgUrl,
        userId: user._id,
        name: user.name,
        userImg: user.profilePic,
      });

      if (blog) {
        const token = jwt.sign(
          { userId: user._id, name: user.name, userImg: user.profilePic },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.status(201).json({ success: true, blog, token });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default route;
