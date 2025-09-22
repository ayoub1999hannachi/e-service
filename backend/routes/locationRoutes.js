// routes/locationRoutes.js
const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();

// Create a new location
router.post('/', locationController.createLocation);

// Get all locations
router.get('/', locationController.getAllLocations);

// Get a single location by ID
router.get('/:id', locationController.getLocationById);

// Update a location by ID
router.put('/:id', locationController.updateLocation);

// Delete a location by ID
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
