import { SavedBusinessService } from '../services/index.js';

export const savedBusinessController = {
  async getUserSavedBusinesses(req, res, next) {
    try {
      console.log('Getting saved businesses for user:', req.user.userId);
      const savedBusinesses = await SavedBusinessService.getUserSavedBusinesses(req.user.userId);
      res.status(200).json({
        success: true,
        message: 'Saved businesses retrieved successfully',
        data: savedBusinesses,
      });
    } catch (error) {
      console.error('Get saved businesses error:', error.message);
      next(error);
    }
  },

  async saveBusiness(req, res, next) {
    try {
      console.log('Saving business:', req.params.businessId, 'for user:', req.user.userId);
      const savedBusiness = await SavedBusinessService.saveBusiness(req.user.userId, req.params.businessId);
      res.status(201).json({
        success: true,
        message: 'Business saved successfully',
        data: savedBusiness,
      });
    } catch (error) {
      console.error('Save business error:', error.message);
      next(error);
    }
  },

  async unsaveBusiness(req, res, next) {
    try {
      console.log('Unsaving business:', req.params.businessId, 'for user:', req.user.userId);
      await SavedBusinessService.unsaveBusiness(req.user.userId, req.params.businessId);
      res.status(200).json({
        success: true,
        message: 'Business unsaved successfully',
      });
    } catch (error) {
      console.error('Unsave business error:', error.message);
      next(error);
    }
  },

  async checkIfSaved(req, res, next) {
    try {
      const isSaved = await SavedBusinessService.checkIfSaved(req.user.userId, req.params.businessId);
      res.status(200).json({
        success: true,
        data: { isSaved },
      });
    } catch (error) {
      console.error('Check if saved error:', error.message);
      next(error);
    }
  },
};
