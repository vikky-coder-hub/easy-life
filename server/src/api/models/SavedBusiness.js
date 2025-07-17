import mongoose from 'mongoose';

const savedBusinessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Create compound index to ensure a user can't save the same business twice
savedBusinessSchema.index({ userId: 1, businessId: 1 }, { unique: true });

export const SavedBusiness = mongoose.model('SavedBusiness', savedBusinessSchema);
