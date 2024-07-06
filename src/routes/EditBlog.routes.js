import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";

const route = Router();

config();

route.put("/edit/:id", async (req, res) => {
  const { blogTitle, blogDesc } = req.body;
  const { id } = req.params;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        blogTitle,
        blogDesc,
      },
      { new: true }
    ); // Add { new: true } to return the updated document

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (e) {
    console.error("Error updating blog:", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
