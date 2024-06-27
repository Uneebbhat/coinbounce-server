import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";

const route = Router();

config();

route.get("/get-blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getBlogByID = await Blog.findById(id);
    return res.status(200).json({ success: true, data: getBlogByID });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
