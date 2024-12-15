const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    user_id: { 
      type: ObjectId, 
      required: true 
    }, 
    category: { 
      type: String, 
      enum: ['artist', 'album', 'track'], 
      required: true 
    },
    item_id: { 
      type: String, 
      required: true 
    }, 
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite; 