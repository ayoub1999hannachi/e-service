// controllers/locationController.js
const locationService = require('../services/locationService');

const createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    const location = await locationService.createLocation(name);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location', error });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await locationService.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await locationService.getLocationById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { name } = req.body;
    const location = await locationService.updateLocation(req.params.id, name);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await locationService.deleteLocation(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location', error });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
