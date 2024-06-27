import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/User.model.js";

config();

const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not found" });
      }

      req.user = {
        user,
      };

      next();
    } catch (dbErr) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export default authentication;
