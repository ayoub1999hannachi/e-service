const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const {

  signup,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  loadProfile,
  getUsersByLocation,
  getUsersBySpecialite,
  logout,
  getUserById,
} = require('../controllers/userController');
const user = require('../models/user');


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


router.post('/signup', upload.fields([{ name: 'image', maxCount: 1 },{ name: 'profileimage', maxCount: 1 } , { name: 'video', maxCount: 1 }]), signup);
router.post('/login', login);
router.post('/logout', logout); 
router.get('/profile' , loadProfile);
router.get('/users', getAllUsers);
router.delete('/users/:id' , deleteUser);
router.put('/users/:id', updateUser);
router.get('/users/specialite/:specialiteId', getUsersBySpecialite);
router.get('/users/location/:loactionId', getUsersByLocation);

// Your route to get user by ID
router.get('/user/:id', (req, res) => {
  const id = req.params.id;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  // Convert the ID to an ObjectId
  const objectId = new mongoose.Types.ObjectId(id);

  user.findOne({ _id: objectId })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'No active session' });
  }
});



module.exports = router;
