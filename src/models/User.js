const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  user_role: {
    type: String,
    required: true,
    enum: ['admin', 'editor', 'viewer']
  },
  organization: {
    type: ObjectId,
    ref: 'Organization',
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
 