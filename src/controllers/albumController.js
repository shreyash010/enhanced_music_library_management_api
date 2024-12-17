const Album = require('../models/Album'); // Import Album model
const Artist = require('../models/Artist'); // Import Artist model for validation

// Controller for Albums
  
// 1. Retrieve all albums with filters, limit, and offset
const getAllAlbums =  async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, hidden } = req.query;

    // Build filter conditions
    const filter = {};
    if (artist_id) filter.artist_id = artist_id;
    if (hidden !== undefined) filter.hidden = hidden === 'true';

    const albums = await Album.find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .populate('artist_id', 'name') // Fetch artist name
      .exec();

    res.status(200).json({
      status: 200,
      data: albums,
      message: 'Albums retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Failed to fetch albums.',
      error: error.message,
    });
  }
};

// 2. Retrieve a single album by ID
const  getAlbumById = async (req, res) => {
  try {
    const { album_id } = req.params;

    const album = await Album.findById(album_id).populate('artist_id', 'name');
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: album,
      message: 'Album retrieved successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Failed to fetch the album.',
      error: error.message,
    });
  }
};

// 3. Add a new album
const addAlbum = async (req, res) => {
  try {
    const { artist_id, name, year, hidden } = req.body;

    // Validate artist existence
    const artist = await Artist.findById(artist_id);
    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Artist not found. Cannot create album.',
        error: null,
      });
    }

    // Create new album
    const newAlbum = new Album({
      artist_id,
      name,
      year,
      hidden,
    });
    await newAlbum.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Album created successfully.',
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Failed to create album.',
      error: error.message,
    });
  }
};

// 4. Update an existing album
const updateAlbum = async (req, res) => {
  try {
    const { album_id } = req.params;
    const updateData = req.body;

    const album = await Album.findByIdAndUpdate(album_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found. Cannot update.',
        error: null,
      });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Failed to update album.',
      error: error.message,
    });
  }
};

// 5. Delete an album
const deleteAlbum = async (req, res) => {
  try {
    const { album_id } = req.params;

    const album = await Album.findByIdAndDelete(album_id);
    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Album not found. Cannot delete.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Album: ${album.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: null,
      message: 'Failed to delete album.',
      error: error.message,
    });
  }
};

module.exports = { getAllAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum };
