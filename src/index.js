import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import signupRoute from "./routes/Signup.routes.js";
import loginRoute from "./routes/Login.routes.js";
import createBlogRoute from "./routes/CreateBlog.routes.js";
import getAllBlogsRoute from "./routes/GetAllBlogs.routes.js";
import getBlogByID from "./routes/GetBlogByID.routes.js";
import getNewsRoute from "./routes/GetNews.routes.js";
import cookieParser from "cookie-parser";

const app = express();

config();
dbConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 5001;

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api", createBlogRoute);
app.use("/api", getAllBlogsRoute);
app.use("/api", getNewsRoute);
app.use("/api", getBlogByID);

app.get("/", (req, res) => {
  console.log("Hello, world");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
