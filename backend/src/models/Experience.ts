import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true },
  slots: [{
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    capacity: { type: Number, required: true },
    booked: { type: Number, default: 0 }
  }]
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);