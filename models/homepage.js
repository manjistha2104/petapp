import mongoose from 'mongoose';

// Define a sub-schema for banners
const bannerSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: false,
  },
});

// Define a sub-schema for categories
const categorySchema = new mongoose.Schema({
  image: {
    type: String, 
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
});

// Define a sub-schema for services
const serviceSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
});

// Define the main homepage schema
const homepageSchema = new mongoose.Schema({
  banners: [bannerSchema], // Array of banners
  categories: [categorySchema], // Array of categories
  services: [serviceSchema], // Array of services
 
});

// Export the model
const Homepage = mongoose.models.Homepage || mongoose.model('Homepage', homepageSchema);
export default Homepage;
