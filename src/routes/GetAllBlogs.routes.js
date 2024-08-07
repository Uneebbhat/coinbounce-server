import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";

const route = Router();

config();

route.get("/get-blogs", async (req, res) => {
  try {
    const getALlBLogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: getALlBLogs });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
