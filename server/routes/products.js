const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { campus, category } = req.query;
    const filter = { status: 'available' };
    
    if (campus) filter.campus = campus;
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .populate('seller', 'name email campus')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email campus');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Create new product (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const seller = req.user.userId;

    const user = await User.findById(seller);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      seller,
      campus: user.campus
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Mark product as sold (protected route)
router.patch('/:id/sold', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.userId },
      { status: 'sold' },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});

module.exports = router;