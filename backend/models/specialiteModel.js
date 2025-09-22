const mongoose = require('mongoose');

const specialiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false } // Path to the image file
});

module.exports = mongoose.model('Specialite', specialiteSchema);
