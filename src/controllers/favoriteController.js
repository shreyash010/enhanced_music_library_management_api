const Favorite = require('../models/Favorite');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');

// 1. Retrieve favorites by category
const getFavoritesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 5, offset = 0 } = req.query;
    const userId = req.user.id; // Extracted from Authorization token middleware

    if (!['artist', 'album', 'track'].includes(category)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid category. Allowed values are artist, album, track.',
        error: null,
      });
    }

    const favorites = await Favorite.find({ user_id: userId, category })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const enrichedFavorites = await Promise.all(favorites.map(async (favorite) => {
      let item;
      if (category === 'artist') {
        item = await Artist.findById(favorite.item_id).select('name');
      } else if (category === 'album') {
        item = await Album.findById(favorite.item_id).select('name');
      } else if (category === 'track') {
        item = await Track.findById(favorite.item_id).select('name');
      }

      return {
        favorite_id: favorite._id,
        category: favorite.category,
        item_id: favorite.item_id,
        name: item ? item.name : 'Unknown',
        created_at: favorite.created_at,
      };
    }));

    res.status(200).json({
      status: 200,
      data: enrichedFavorites,
      message: 'Favorites retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 2. Add a favorite
const addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;
    const userId = req.user.id; // Extracted from Authorization token middleware

    if (!['artist', 'album', 'track'].includes(category)) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Invalid category. Allowed values are artist, album, track.',
        error: null,
      });
    }

    const favorite = new Favorite({ category, item_id, user_id: userId });
    await favorite.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Favorite added successfully.',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 3. Remove a favorite by ID
const removeFavorite = async (req, res) => {
  try {
    const { favorite_id } = req.params;
    const userId = req.user.id;

    const favorite = await Favorite.findOneAndDelete({
      _id: favorite_id,
      user_id: userId,
    });

    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Favorite not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Favorite removed successfully.',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getFavoritesByCategory,
  addFavorite,
  removeFavorite,
};
