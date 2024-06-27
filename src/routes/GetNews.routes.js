import { Router } from "express";
import { config } from "dotenv";
import axios from "axios";

const route = Router();

config();

route.get("/get-news", async (req, res) => {
  const apiKey = process.env.NEWS_API_KEY;
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  try {
    const getNews = await axios.get(apiUrl);
    return res.status(200).json({ success: true, data: getNews.data.articles });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default route;
