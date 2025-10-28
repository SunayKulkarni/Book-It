import type { Request, Response } from 'express';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';

// GET /experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().select('-slots');
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /experiences/:id
export const getExperienceDetails = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /bookings
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, slotId, userEmail, userName, promoCode } = req.body;

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const slot = experience.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.booked >= slot.capacity) {
      return res.status(400).json({ message: 'Slot is fully booked' });
    }

    // Calculate price (apply promo if valid)
    let totalPrice = experience.price;
    if (promoCode) {
      // Simple promo logic - you can expand this
      if (promoCode === 'SAVE10') totalPrice *= 0.9;
      if (promoCode === 'FLAT100') totalPrice -= 100;
    }

    // Create booking and update slot capacity
    const booking = new Booking({
      experienceId,
      slotId,
      userEmail,
      userName,
      totalPrice,
      promoCode
    });

    slot.booked += 1;
    await Promise.all([booking.save(), experience.save()]);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /promo/validate
export const validatePromo = async (req: Request, res: Response) => {
  const { code } = req.body;
  
  // Simple promo validation - you can expand this
  const validPromos: Record<string, { discount: string }> = {
    'SAVE10': { discount: '10%' },
    'FLAT100': { discount: '₹100' }
  };

  if (validPromos[code]) {
    res.json({ valid: true, ...validPromos[code] });
  } else {
    res.status(400).json({ valid: false, message: 'Invalid promo code' });
  }
};