import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL!, // your deployed frontend
      "http://localhost:5173",  // local dev frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api', router);


mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
