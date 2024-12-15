const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const albumSchema = new Schema({
    name: { 
      type: String, 
      required: true 
    },
    year: { 
      type: Number, 
      required: true 
    },
    artist_id: { 
      type: ObjectId, 
      required: true 
    }, 
    hidden: { 
      type: Boolean, 
      default: false 
    },
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
