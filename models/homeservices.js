import mongoose from 'mongoose';

// Define individual banner entry schema
const bannerEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

// Define the parent schema for storing multiple banners
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  banners: [bannerEntrySchema],  // Array of individual banner entries
}, { timestamps: true });

// Create the model
const HomeservicesModel = mongoose.models.Homeservices || mongoose.model('homeservices', bannerSchema);

export default HomeservicesModel;


