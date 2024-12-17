const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const trackSchema = new Schema({
    name: { 
      type: String, 
      required: true 
    },
    duration: { 
      type: Number, 
      required: true 
    },
    artist_id: { 
      type: ObjectId, 
      required: true 
    },
    album_id: {
      type: ObjectId,
      required: true
    },
    hidden: { 
      type: Boolean, 
      default: false 
    },
}, { timestamps: true });

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
