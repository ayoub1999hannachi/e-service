const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
  role: { type: Number, enum: [0, 1, 2], default: 0 },
  password: { type: String, required: true },
  description: { type: String },
  specialite: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialite' },
  image: { type: String },
  profileimage: { type: String },
  video: { type: String }
});
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.statics.findBySpecialite = function(specialiteId) {
  return this.find({ specialite: specialiteId }).populate('specialite');
};
userSchema.statics.findBylocation = function(locationId) {
  return this.find({ location: locationId }).populate('location');
};

module.exports = mongoose.model('User', userSchema);

