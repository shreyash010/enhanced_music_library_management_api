const express = require('express');
const {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist
} = require('../controllers/artistController');

const artistRouter = express.Router();

// Artist Routes

// Route to get all artists
artistRouter.get('/artists', getArtists); // Handles 200, 400, 401

// Route to get a single artist by ID
artistRouter.get('/artists/:id', getArtistById); // Handles 200, 401, 403, 404

// Route to add a new artist
artistRouter.post('/artists/add-artist', addArtist); // Handles 201, 400, 401

// Route to update an artist by ID
artistRouter.put('/artists/:id', updateArtist); // Handles 204, 400, 401, 403, 404

// Route to delete an artist by ID
artistRouter.delete('/artists/:id', deleteArtist); // Handles 200, 400, 401, 403, 404

module.exports = artistRouter;
