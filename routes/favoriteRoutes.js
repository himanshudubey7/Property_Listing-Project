const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/favoriteController');

// Add property to favorites
router.post('/:propertyId', protect, addFavorite);

// Remove property from favorites
router.delete('/:propertyId', protect, removeFavorite);

// Get all favorite properties
router.get('/', protect, getFavorites);

module.exports = router;
