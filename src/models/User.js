const mongoose = require('mongoose');

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
  user_roles: {
    type: [String],
    required: true,
    enum: ['Admin', 'Editor', 'Viewer'],
    validate: {
      validator: (roles) => roles.length > 0,
      message: 'At least one role must be specified',
    },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
 