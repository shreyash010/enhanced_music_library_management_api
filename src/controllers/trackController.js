const Track = require('../models/Track');
const Artist = require('../models/Artist'); // Assuming Artist model exists
const Album = require('../models/Album');   // Assuming Album model exists

// 1. Retrieve all tracks with filters, pagination, and enriched data
const getAllTracks = async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

    // Build dynamic filters
    const filters = {};
    if (artist_id) filters.artist_id = artist_id;
    if (album_id) filters.album_id = album_id;
    if (hidden !== undefined) filters.hidden = hidden === 'true';

    // Fetch tracks with pagination
    const tracks = await Track.find(filters)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    // Enrich data with artist_name and album_name
    const enrichedTracks = await Promise.all(tracks.map(async (track) => {
      const [artist, album] = await Promise.all([
        Artist.findById(track.artist_id).select('name'),
        Album.findById(track.album_id).select('name'),
      ]);

      return {
        track_id: track._id,
        artist_name: artist ? artist.name : 'Unknown Artist',
        album_name: album ? album.name : 'Unknown Album',
        name: track.name,
        duration: track.duration,
        hidden: track.hidden,
      };
    }));

    res.status(200).json({
      status: 200,
      data: enrichedTracks,
      message: 'Tracks retrieved successfully.',
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 2. Retrieve a single track by ID
const getTrackById = async (req, res) => {
  try {
    const { track_id } = req.params;

    const track = await Track.findById(track_id);
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null,
      });
    }

    const [artist, album] = await Promise.all([
      Artist.findById(track.artist_id).select('name'),
      Album.findById(track.album_id).select('name'),
    ]);

    const enrichedTrack = {
      track_id: track._id,
      artist_name: artist ? artist.name : 'Unknown Artist',
      album_name: album ? album.name : 'Unknown Album',
      name: track.name,
      duration: track.duration,
      hidden: track.hidden,
    };

    res.status(200).json({
      status: 200,
      data: enrichedTrack,
      message: 'Track retrieved successfully.',
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 3. Add a new track
const addTrack = async (req, res) => {
  try {
    const { artist_id, album_id, name, duration, hidden } = req.body;

    if (!artist_id || !album_id || !name || !duration) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Required fields are missing.',
        error: null,
      });
    }

    const newTrack = new Track({ artist_id, album_id, name, duration, hidden });
    await newTrack.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'Track created successfully.',
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 4. Update a track
const updateTrack = async (req, res) => {
  try {
    const { track_id } = req.params;
    const updates = req.body;

    const updatedTrack = await Track.findByIdAndUpdate(track_id, updates, { new: true });
    if (!updatedTrack) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null,
      });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// 5. Delete a track
const deleteTrack = async (req, res) => {
  try {
    const { track_id } = req.params;

    const track = await Track.findByIdAndDelete(track_id);
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Track not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Track: ${track.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTracks,
  getTrackById,
  addTrack,
  updateTrack,
  deleteTrack,
};
