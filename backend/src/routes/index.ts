import express from 'express';
import {
  getExperiences,
  getExperienceDetails,
  createBooking,
  validatePromo
} from '../controllers/experienceController';

const router = express.Router();

router.get('/experiences', getExperiences);
router.get('/experiences/:id', getExperienceDetails);
router.post('/bookings', createBooking);
router.post('/promo/validate', validatePromo);

export default router;