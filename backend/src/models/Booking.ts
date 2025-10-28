import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Experience', 
    required: true 
  },
  slotId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);