import { Router } from "express";
import { config } from "dotenv";
import Blog from "../models/Blog.model.js";
import User from "../models/User.model.js";

const route = Router();

config();

route.put("/profile/edit/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updateUser });
  } catch (e) {
    console.error("Error updating blog:", e);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
