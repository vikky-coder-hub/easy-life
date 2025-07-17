import { SavedBusiness, Business } from '../models/index.js';

export const SavedBusinessService = {
  async getUserSavedBusinesses(userId) {
    const savedBusinesses = await SavedBusiness.find({ userId })
      .populate({
        path: 'businessId',
        select: 'name description category address phone email rating reviewCount images services featured isVerified createdAt',
        populate: {
          path: 'userId',
          select: 'name email phone'
        }
      })
      .sort({ savedAt: -1 });

    // Filter out any savedBusinesses where the business no longer exists
    const validSavedBusinesses = savedBusinesses.filter(saved => saved.businessId);

    return validSavedBusinesses.map(saved => ({
      ...saved.businessId.toObject(),
      savedAt: saved.savedAt,
      savedBusinessId: saved._id
    }));
  },

  async saveBusiness(userId, businessId) {
    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error('Business not found');
    }

    // Check if already saved
    const existingSaved = await SavedBusiness.findOne({ userId, businessId });
    if (existingSaved) {
      throw new Error('Business already saved');
    }

    // Create saved business record
    const savedBusiness = new SavedBusiness({
      userId,
      businessId,
      savedAt: new Date()
    });

    await savedBusiness.save();

    // Return the business details with saved info
    return {
      ...business.toObject(),
      savedAt: savedBusiness.savedAt,
      savedBusinessId: savedBusiness._id
    };
  },

  async unsaveBusiness(userId, businessId) {
    const result = await SavedBusiness.findOneAndDelete({ userId, businessId });
    if (!result) {
      throw new Error('Business not found in saved list');
    }
    return result;
  },

  async checkIfSaved(userId, businessId) {
    const saved = await SavedBusiness.findOne({ userId, businessId });
    return !!saved;
  },
};
