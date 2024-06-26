import { config } from "dotenv";
import mongoose from "mongoose";

config();

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connected successfully: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error connecting to database: ${e.message}`);
  }
};

export default dbConnect;
