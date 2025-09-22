const Specialite = require('../models/specialiteModel');

// Create a new specialite
exports.createSpecialite = async (specialiteData) => {
  const specialite = new Specialite(specialiteData);
  return specialite.save();
};

// Get all specialites
exports.getAllSpecialites = async () => {
  return Specialite.find();
};

// Get specialite by ID
exports.getSpecialiteById = async (id) => {
  return Specialite.findById(id);
};

// Update specialite by ID
exports.updateSpecialite = async (id, updateData) => {
  return Specialite.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete specialite by ID
exports.deleteSpecialite = async (id) => {
  return Specialite.deleteOne({ _id: id });
};
