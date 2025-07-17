import express from 'express';
import { savedBusinessController } from '../controllers/index.js';
import { authenticate, restrictTo } from '../middlewares/index.js';

const router = express.Router();

// Get user's saved businesses
router.get('/', authenticate, restrictTo('customer'), savedBusinessController.getUserSavedBusinesses);

// Save a business
router.post('/:businessId', authenticate, restrictTo('customer'), savedBusinessController.saveBusiness);

// Unsave a business
router.delete('/:businessId', authenticate, restrictTo('customer'), savedBusinessController.unsaveBusiness);

// Check if business is saved by user
router.get('/check/:businessId', authenticate, restrictTo('customer'), savedBusinessController.checkIfSaved);

export { router as default, router as savedBusinessRouter };
