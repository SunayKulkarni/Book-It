import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { sampleExperiences } from './sampleData.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Clear existing data
    await Experience.deleteMany({});
    
    // Insert sample data
    await Experience.insertMany(sampleExperiences);
    
    console.log('Sample data seeded successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();