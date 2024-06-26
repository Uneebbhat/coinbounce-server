import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  console.log("Hello, world");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
