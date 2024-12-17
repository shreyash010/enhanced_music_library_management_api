const Artist = require('../models/Artist'); 

// GET /artists - Retrieve All Artists
const getArtists = async (req, res) => {
  try {
    const { limit = 5, offset = 0, grammy, hidden } = req.query;

    const filter = {};
    if (grammy) filter.grammy = Number(grammy);
    if (hidden) filter.hidden = hidden === 'true';

    const artists = await Artist.find(filter)
      .skip(Number(offset))
      .limit(Number(limit));

    res.status(200).json({
      status: 200,
      data: artists,
      message: 'Artists retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


// GET /artists/:id - Retrieve an Artist
const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findById(id, {_id: 1, name: 1, grammy: 1, hidden: 1});
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: 'Artist retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


// POST /artists/add-artist - Add a new Artist
const addArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;

    const newArtist = new Artist({
      name,
      grammy: grammy || 0, // Default to 0 if not provided
      hidden: hidden ?? false, // Default to false if not provided
    });

    await newArtist.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Artist created successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// PUT /artists/:id - Update an Artist
const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grammy, hidden } = req.body;

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null,
      });
    }

    // Update fields conditionally
    if (name) artist.name = name;
    if (grammy !== undefined && grammy >= 0) artist.grammy = grammy;
    if (hidden !== undefined) artist.hidden = hidden;

    await artist.save();

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};


// DELETE /artists/:id - Delete an Artist
const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: { artist_id: id },
      message: `Artist: ${artist.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

module.exports = {
  getArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
};
