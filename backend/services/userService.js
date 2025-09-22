const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
  const { fullname, email, phone, location, password, description, specialite, image, video, profileimage, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    email,
    phone,
    location,
    password: hashedPassword,
    description,
    specialite,
    image,
    video,
    profileimage,
    role: role || 0
  });

  return newUser.save();
};

const getAllUsers = async () => {
  return User.find();
};

const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const getUsersBySpecialite = async (req, res) => {
  const { specialiteId } = req.params;
  try {
    const users = await userService.getUsersBySpecialite(specialiteId); // Call the function from userService
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by specialite:', error);
    res.status(500).json({ message: 'Error fetching users by specialite' });
  }
};
const getUsersByLocation = async (req, res) => {
  const { locationId } = req.params;
  try {
    const users = await userService.getUsersByLocation(locationId); // Call the function from userService
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by location:', error);
    res.status(500).json({ message: 'Error fetching users by location' });
  }
};



const getUserById = async (_id) => {
  try {
    // Fetch the user by ID without populating any related documents
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUsersByLocation,
  getUsersBySpecialite,
  getUserById,
};
