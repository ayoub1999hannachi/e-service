// services/locationService.js
const Location = require('../models/location');

const createLocation = async (name) => {
  const location = new Location({ name });
  return await location.save();
};

const getAllLocations = async () => {
  return await Location.find();
};

const getLocationById = async (id) => {
  return await Location.findById(id);
};

const updateLocation = async (id, name) => {
  return await Location.findByIdAndUpdate(id, { name }, { new: true });
};

const deleteLocation = async (id) => {
  return await Location.findByIdAndDelete(id);
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
