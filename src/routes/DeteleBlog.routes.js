import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";

const route = Router();

config();

route.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data: deleteBlog });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
