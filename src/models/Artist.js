const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    name: { 
      type: String, 
      required: true
    },
    grammy: { 
      type: Number, 
      default: 0,
      min: [0, 'Grammy count cannot be negative'],
    },
    hidden: { 
      type: Boolean, 
      default: false 
    },
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema); 
module.exports = Artist;
