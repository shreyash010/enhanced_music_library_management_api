const mongoose = require('mongoose');
const { Schema } = mongoose;

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
      type: String, 
      required: true 
    }, 
    hidden: { 
      type: Boolean, 
      default: false 
    },
}, { timestamps: true });

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
