import { Router } from "express";
import { config } from "dotenv";
import authentication from "../middleware/authentication.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const route = Router();

config();

route.get(
  "/dashboard",
  authentication,
  authorize("admin"),
  async (req, res) => {
    try {
      res.status(200).json({ success: true, message: "Dashboard" });
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default route;
