const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    name: { 
      type: String, 
      required: true
    },
    grammy: { 
      type: Boolean, 
      default: false 
    },
    hidden: { 
      type: Boolean, 
      default: false 
    },
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema); 
module.exports = Artist;
