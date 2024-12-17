const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: ObjectID,
    ref: 'User',
    unique: true,
  },
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
