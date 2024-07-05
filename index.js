import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./src/config/dbConnect.js";
import signupRoute from "./src/routes/Signup.routes.js";
import loginRoute from "./src/routes/Login.routes.js";
import createBlogRoute from "./src/routes/CreateBlog.routes.js";
import getAllBlogsRoute from "./src/routes/GetAllBlogs.routes.js";
import getBlogByID from "./src/routes/GetBlogByID.routes.js";
import getCurrentUser from "./src/routes/GetCurrentUser.routes.js";
import getNewsRoute from "./src/routes/GetNews.routes.js";
import profileRoute from "./src/routes/Profile.routes.js";
import userBlogRoute from "./src/routes/GetUserBlog.routes.js";
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
