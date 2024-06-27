import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";
import authentication from "../middleware/authentication.middleware.js";

const route = Router();

config();

route.get("/get-user", authentication, async (req, res) => {
  try {
    return res.status(200).json({ success: true, data: req.user });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
