const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getArtists, addArtist } = require('../controllers/artistController');

const router = express.Router();

router.get('/', protect, getArtists);        // GET /api/v1/artists
router.post('/add-artist', protect, addArtist); // POST /api/v1/artists/add-artist

module.exports = router;
