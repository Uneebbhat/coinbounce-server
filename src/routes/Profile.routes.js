import { Router } from "express";
import { config } from "dotenv";
import User from "../models/User.model.js";
import authentication from "../middleware/authentication.middleware.js";

const route = Router();

config();

route.get("/profile/:id", authentication, async (req, res) => {
  const { user } = req.user;
  const { id } = req.params;
  //   console.log(user);
  try {
    const profile = await User.findOne({ _id: user._id });
    res.status(200).json({ success: true, data: profile });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
