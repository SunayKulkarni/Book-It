import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://book-it-sage-eight.vercel.app", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options(/.*/, cors());



app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const PORT = process.env.PORT;
app.listen(PORT, () => {

  console.log(` Server running on port ${PORT}`);
});
