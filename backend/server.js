const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes');
const locationRoutes = require('./routes/locationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.io on the server
const io = socketIo(server, {
  cors: {
    origin: 'http://192.168.1.22:8080', // Your Vue.js frontend URL
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials (cookies) to be sent
  }
});

// MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/helloworld',
  collection: 'sessions'
});

store.on('error', function (error) {
  console.error('Session store error:', error);
});

// Set up CORS with credentials
app.use(cors({
  origin: 'http://192.168.1.15:8080', // Your Vue.js frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: store, // Store sessions in MongoDB
  cookie: { secure: false } // Set to true if using HTTPS
}));

// JSON body parsing middleware
app.use(express.json());

// Static file middleware
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/image', express.static('./uploads'));

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new messages and broadcast to other users
  socket.on('sendMessage', (message) => {
    // Broadcast the message to all connected users
    io.emit('newMessage', message); // Changed to 'newMessage' for clarity

    // Optionally save the message to the database here if needed
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/helloworld', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB Connected!");

    // Start server
    server.listen(8000, function (error) {
      if (error) {
        console.log("Error starting server:", error);
      } else {
        console.log("Server started on port 8000");
      }
    });
  })
  .catch(error => {
    console.log("Database connection error:", error);
  });
