import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";
import authentication from "../middleware/authentication.middleware.js";

const route = Router();

config();

route.get("/profile/:id/blogs", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await Blog.find({ userId: id });
    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    }
    return res.status(200).json({ success: true, data: blogs });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
