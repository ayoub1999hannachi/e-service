const specialiteService = require('../services/specialiteService');

// Create a new specialite
exports.createSpecialite = async (req, res) => {
  try {
    const specialiteData = req.body;
    if (req.file) {
      specialiteData.image = req.file.path; 
    }
    const specialite = await specialiteService.createSpecialite(specialiteData);
    res.status(201).json(specialite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update specialite by ID
exports.updateSpecialite = async (req, res) => {
  try {
    const specialiteData = req.body;
    if (req.file) {
      specialiteData.image = req.file.path; // Store the path to the image
    }
    const specialite = await specialiteService.updateSpecialite(req.params.id, specialiteData);
    if (specialite) {
      res.status(200).json(specialite);
    } else {
      res.status(404).json({ message: 'Specialite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await specialiteService.getAllSpecialites();
    res.status(200).json(specialites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specialite by ID
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await specialiteService.getSpecialiteById(req.params.id);
    if (specialite) {
      res.status(200).json(specialite);
    } else {
      res.status(404).json({ message: 'Specialite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete specialite by ID
exports.deleteSpecialite = async (req, res) => {
  try {
    const result = await specialiteService.deleteSpecialite(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Specialite deleted' });
    } else {
      res.status(404).json({ message: 'Specialite not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
