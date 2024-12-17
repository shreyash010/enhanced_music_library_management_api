const express = require('express');
const router = express.Router();
const { getAllAlbums, 
  getAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum
} = require('../controllers/albumController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Constants = require('../utils/constants');


// 1. Retrieve all albums with filters (Viewer, Editor, Admin)
router.get('/albums', roleMiddleware(Constants.PERMISSION.READ), getAllAlbums);

// 2. Retrieve a single album by ID (Viewer, Editor, Admin)
router.get('/albums/:album_id', roleMiddleware(Constants.PERMISSION.READ), getAlbumById);

// 3. Add a new album (Editor, Admin only)
router.post('/albums/add-album', roleMiddleware(Constants.PERMISSION.WRITE), addAlbum);

// 4. Update an album by ID (Editor, Admin only)
router.put('/albums/:album_id', roleMiddleware(Constants.PERMISSION.WRITE), updateAlbum);

// 5. Delete an album by ID (Admin only)
router.delete('/albums/:album_id', roleMiddleware(Constants.PERMISSION.WRITE), deleteAlbum);

module.exports = router;
