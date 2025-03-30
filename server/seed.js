require('dotenv').config();
const mongoose = require('mongoose');
const { campuses, categories } = require('./utils/campusData');
const User = require('./models/User');
const Product = require('./models/Product');
const bcrypt = require('bcrypt');

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample product images from Pexels
const sampleImages = [
  'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
  'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
  'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  'https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg'
];

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create test users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: `Test User ${i+1}`,
        email: `user${i+1}@test.com`,
        password: await bcrypt.hash('password123', 10),
        campus: campuses[i % campuses.length],
        role: i === 0 ? 'seller' : 'buyer'
      });
      users.push(await user.save());
    }

    // Create test products
    for (let i = 0; i < 20; i++) {
      const seller = users[i % users.length];
      const product = new Product({
        title: `Test Product ${i+1}`,
        description: `This is a sample product description for item ${i+1}`,
        price: Math.floor(Math.random() * 100) + 10,
        category: categories[i % categories.length],
        image: sampleImages[i % sampleImages.length],
        seller: seller._id,
        campus: seller.campus
      });
      await product.save();
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();