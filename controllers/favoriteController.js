const User = require('../models/User');
const Property = require('../models/Property');

const addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user.favorites.includes(req.params.propertyId)) {
    user.favorites.push(req.params.propertyId);
    await user.save();
  }

  res.status(200).json({ message: 'Property added to favorites' });
};

const removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== req.params.propertyId
  );

  await user.save();
  res.status(200).json({ message: 'Property removed from favorites' });
};


const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.status(200).json(user.favorites);
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
