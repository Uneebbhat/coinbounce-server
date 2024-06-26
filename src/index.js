import { config } from "dotenv";
import express from "express";
import dbConnect from "./config/dbConnect.js";

const app = express();

config();
dbConnect();

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  console.log("Hello, world");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
