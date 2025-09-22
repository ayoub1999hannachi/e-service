const userService = require('../services/userService');
const upload = require('../middlewares/upload');
const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const imageUrl = req.files && req.files['image'] ? `uploads\\${req.files['image'][0].filename}` : '';
    const videoUrl = req.files && req.files['video'] ? `uploads\\${req.files['video'][0].filename}` : '';
    const profileimageUrl = req.files && req.files['profileimage'] ? `uploads\\${req.files['profileimage'][0].filename}` : '';

    const userData = {
      ...req.body,
      image: imageUrl,
      profileimage: profileimageUrl,
      video: videoUrl,

      role: req.body.role || 0
    };

    const user = await userService.createUser(userData);
    res.status(201).json({ ...user.toObject(), image: imageUrl, profileimage: profileimageUrl,video: videoUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    if (typeof user.comparePassword !== 'function') {
      console.error('comparePassword method is not defined');
      return res.status(500).json({ error: 'Server error: method missing' });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    req.session.user = {
      id: user._id,
      role: user.role
    };

    res.json({ message: 'Login successful', user: { _id: user._id, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging out', error: err });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const loadProfile = async (req, res) => {
  try {
    // Check if the user is authenticated (using the session)
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Fetch user ID from the session
    const userId = req.session.user.id;

    // Retrieve the user's profile from the database
    const user = await User.findById(userId).populate('specialite', 'name'); // Populating specialite field if needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile
    res.status(200).json(user);
  } catch (error) {
    console.error('Error loading profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};






const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUsersByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const users = await User.find({ location: locationId }).populate('location');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

const getUsersBySpecialite = async (req, res) => {
  try {
    const specialiteId = req.params.specialiteId;
    const users = await User.find({ specialite: specialiteId }).populate('specialite');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

const getUserById = async (req, res) => { 
  const { id } = req.params;
  try {
   
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports = {
  signup,
  login,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
  loadProfile,
  getUsersByLocation,
  getUsersBySpecialite,
  getUserById,
};