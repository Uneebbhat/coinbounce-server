import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import signupRoute from "./routes/Signup.routes.js";
import loginRoute from "./routes/Login.routes.js";
import createBlogRoute from "./routes/CreateBlog.routes.js";
import getAllBlogsRoute from "./routes/GetAllBlogs.routes.js";
import getBlogByID from "./routes/GetBlogByID.routes.js";
import getCurrentUser from "./routes/GetCurrentUser.routes.js";
import getNewsRoute from "./routes/GetNews.routes.js";
import profileRoute from "./routes/Profile.routes.js";
import userBlogRoute from "./routes/GetUserBlog.routes.js";
import deleteBlogRoute from "./routes/DeteleBlog.routes.js";
import editBlogRoute from "./routes/EditBlog.routes.js";
import cookieParser from "cookie-parser";

const app = express();

config();
dbConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", createBlogRoute);
app.use("/api", getAllBlogsRoute);
app.use("/api", getNewsRoute);
app.use("/api", getBlogByID);
app.use("/api", getCurrentUser);
app.use("/api", profileRoute);
app.use("/api", userBlogRoute);
app.use("/api", deleteBlogRoute);
app.use("/api", editBlogRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
