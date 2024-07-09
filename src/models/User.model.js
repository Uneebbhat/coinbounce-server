import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    profilePic: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      minlength: [5, "Name must be at least 5 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
