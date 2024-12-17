const express = require('express');
const router = express.Router();
const {
  getFavoritesByCategory,
  addFavorite,
  removeFavorite,
} = require('../controllers/favoriteController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Constants = require('../utils/constants');

// Routes for Favorites
router.get('/favorites/:category', roleMiddleware(Constants.PERMISSION.READ), getFavoritesByCategory);

router.post('/favorites/add-favorite', roleMiddleware(Constants.PERMISSION.READ), addFavorite);

router.delete('/favorites/remove-favorite/:favorite_id', roleMiddleware(Constants.PERMISSION.READ), removeFavorite);

module.exports = router;