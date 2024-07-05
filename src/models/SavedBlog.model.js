import mongoose, { Schema } from "mongoose";

const savedBlogSchema = new Schema(
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
      required: true,
      trim: true,
    },
    blogImg: {
      type: String,
      require: true,
    },
    blogDesc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SavedBlog = mongoose.model("SavedBlog", savedBlogSchema);

export default SavedBlog;
