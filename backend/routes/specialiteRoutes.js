const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const specialiteController = require('../controllers/specialiteController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename format
  }
});
const upload = multer({ storage: storage });

// Routes for specialites
router.post('/', upload.single('image'), specialiteController.createSpecialite);
router.put('/:id', upload.single('image'), specialiteController.updateSpecialite);
router.get('/', specialiteController.getAllSpecialites);
router.get('/:id', specialiteController.getSpecialiteById);
router.delete('/:id', specialiteController.deleteSpecialite);

module.exports = router;
