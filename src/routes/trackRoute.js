const express = require('express');
const router = express.Router();
const {
  getAllTracks,
  getTrackById,
  addTrack,
  updateTrack,
  deleteTrack,
} = require('../controllers/trackController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Constants = require('../utils/constants');

// 1. Retrieve all tracks with filters (Viewer, Editor, Admin)
router.get('/tracks', roleMiddleware(Constants.PERMISSION.READ), getAllTracks);

// 2. Retrieve a single track by ID (Viewer, Editor, Admin)
router.get('/tracks/:track_id', roleMiddleware(Constants.PERMISSION.READ), getTrackById);

// 3. Add a new track (Editor, Admin only)
router.post('/tracks/add-track', roleMiddleware(Constants.PERMISSION.WRITE), addTrack);

// 4. Update a track by ID (Editor, Admin only)
router.put('/tracks/:track_id', roleMiddleware(Constants.PERMISSION.WRITE), updateTrack);

// 5. Delete a track by ID (Admin only)
router.delete('/tracks/:track_id', roleMiddleware(Constants.PERMISSION.WRITE), deleteTrack);

module.exports = router;
