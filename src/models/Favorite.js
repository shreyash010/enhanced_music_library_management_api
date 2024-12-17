const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  category: {
    type: String,
    enum: ['artist', 'album', 'track'],
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId, // ID of artist, album, or track
    required: true,
    refPath: 'category',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);


const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite; 