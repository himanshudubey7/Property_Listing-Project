const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/favoriteController');

router.post('/:propertyId', protect, addFavorite);

router.delete('/:propertyId', protect, removeFavorite);

router.get('/', protect, getFavorites);

module.exports = router;
