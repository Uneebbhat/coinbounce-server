import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    userImg: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    blogTitle: {
      type: String,
      required: [true, "Title must be at least 10 characters long."],
      trim: true,
    },
    blogImg: {
      type: String,
    },
    blogDesc: {
      type: String,
      required: [true, "Description must be at least 50 words long."],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
