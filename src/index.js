import express from "express";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import signupRoute from "./routes/Signup.routes.js";
import loginRoute from "./routes/Login.routes.js";
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

app.get("/", (req, res) => {
  console.log("Hello, world");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
