import { Router } from "express";
import { config } from "dotenv";
import SavedBlog from "../models/SavedBlog.model.js";

const route = Router();

config();

route.post("/saved-blogs", async (req, res) => {
  try {
    const savedBlogs = await SavedBlog.create
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
