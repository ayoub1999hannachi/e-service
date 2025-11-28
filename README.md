# 🏠 e-Service - Home Services Management Platform

<div align="center">

![e-Service Banner](https://via.placeholder.com/1200x300/4A90E2/ffffff?text=e-Service+Platform)

[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**A modern, full-stack solution for managing home services and connecting customers with service professionals**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

**e-Service** is a comprehensive web application designed to revolutionize the home services industry. It bridges the gap between customers seeking quality home services and skilled professionals ready to deliver them. Built with modern technologies and best practices, e-Service offers a seamless experience for both service providers and customers.

### 🎯 The Problem We Solve

Finding reliable home service providers can be challenging. Traditional methods involve phone calls, unclear pricing, and limited transparency. e-Service transforms this experience by providing:

- **Instant Connection** between customers and verified service professionals
- **Transparent Pricing** and service descriptions
- **Real-time Availability** tracking and booking
- **Secure Payment Processing** and transaction history
- **Rating & Review System** for quality assurance

### 💡 Why e-Service?

- **🚀 Modern Architecture**: Built with scalable, maintainable code following industry best practices
- **📱 Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **🔒 Security First**: JWT authentication, encrypted passwords, and secure API endpoints
- **⚡ Performance Optimized**: Fast loading times and efficient database queries
- **🎨 Beautiful UI/UX**: Intuitive interface designed with Vuetify Material Design

---

## ✨ Features

### For Customers
- 🔍 **Service Discovery**: Browse and search for various home services
- 📅 **Easy Booking**: Schedule services with real-time availability
- 💳 **Secure Payments**: Multiple payment options with transaction history
- ⭐ **Reviews & Ratings**: Rate and review service providers
- 📱 **Notifications**: Real-time updates on booking status
- 📍 **Location Services**: Find nearby service providers

### For Service Providers
- 👤 **Professional Profiles**: Showcase skills, experience, and certifications
- 📊 **Dashboard Analytics**: Track bookings, earnings, and performance metrics
- 📷 **Portfolio Management**: Upload images and videos of completed work
- 💼 **Job Management**: Accept, schedule, and manage service requests
- 💰 **Earnings Tracking**: Monitor income and payment history
- 🔔 **Smart Notifications**: Get alerts for new booking requests

### Administrative Features
- 🛡️ **User Management**: Comprehensive user and provider administration
- 📈 **Analytics Dashboard**: Platform-wide statistics and insights
- ⚙️ **System Configuration**: Flexible settings and customization options
- 🔐 **Role-Based Access Control**: Granular permission management
- 📝 **Audit Logs**: Track system activities and changes

---

## 🛠️ Tech Stack

### Backend
```
Node.js + Express.js    → RESTful API Server
MongoDB + Mongoose      → Database & ODM
JWT + bcrypt           → Authentication & Security
Multer                 → File Upload Handling
Nodemailer             → Email Services
Socket.io              → Real-time Communications
```

### Frontend
```
Vue.js 3               → Progressive JavaScript Framework
Vuetify                → Material Design Component Library
Vue Router             → Client-side Routing
Vuex                   → State Management
Axios                  → HTTP Client
```

### DevOps & Tools
```
Docker                 → Containerization
GitHub Actions         → CI/CD Pipeline
ESLint + Prettier      → Code Quality & Formatting
Jest                   → Testing Framework
```

---

## 📁 Project Structure

```
e-service/
│
├── backend/                    # Backend Node.js application
│   ├── config/                # Configuration files
│   │   ├── database.js       # MongoDB connection setup
│   │   └── auth.js           # Authentication config
│   │
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── serviceController.js
│   │   └── bookingController.js
│   │
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Review.js
│   │
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── services.js
│   │   └── bookings.js
│   │
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js           # Authentication middleware
│   │   ├── validation.js     # Input validation
│   │   └── errorHandler.js   # Error handling
│   │
│   ├── utils/                 # Utility functions
│   │   ├── email.js
│   │   └── fileUpload.js
│   │
│   ├── uploads/               # Uploaded files storage
│   ├── tests/                 # Backend tests
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Vue.js frontend application
│   ├── public/                # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/           # Images, fonts, styles
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │
│   │   ├── components/       # Reusable Vue components
│   │   │   ├── common/
│   │   │   │   ├── Header.vue
│   │   │   │   ├── Footer.vue
│   │   │   │   └── Navbar.vue
│   │   │   ├── services/
│   │   │   │   ├── ServiceCard.vue
│   │   │   │   └── ServiceList.vue
│   │   │   └── bookings/
│   │   │       └── BookingForm.vue
│   │   │
│   │   ├── views/            # Page components
│   │   │   ├── Home.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── Services.vue
│   │   │   ├── ServiceDetails.vue
│   │   │   ├── Dashboard.vue
│   │   │   └── Profile.vue
│   │   │
│   │   ├── router/           # Vue Router configuration
│   │   │   └── index.js
│   │   │
│   │   ├── store/            # Vuex store
│   │   │   ├── index.js
│   │   │   └── modules/
│   │   │       ├── auth.js
│   │   │       ├── services.js
│   │   │       └── bookings.js
│   │   │
│   │   ├── services/         # API service layer
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── serviceService.js
│   │   │
│   │   ├── utils/            # Utility functions
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   │
│   │   ├── plugins/          # Vue plugins
│   │   │   └── vuetify.js
│   │   │
│   │   ├── App.vue           # Root component
│   │   └── main.js           # Application entry point
│   │
│   ├── tests/                 # Frontend tests
│   ├── package.json
│   └── vue.config.js
│
├── docs/                      # Documentation
│   ├── API.md                # API documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   └── CONTRIBUTING.md       # Contribution guidelines
│
├── docker/                    # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── .github/                   # GitHub specific files
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ayoub1999hannachi/e-service.git
cd e-service
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Configure your `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/eservice
MONGODB_TEST_URI=mongodb://localhost:27017/eservice_test

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:8080
```

```bash
# Start MongoDB (if not running)
mongod

# Run backend server
npm run dev

# Or for production
npm start
```

The backend API will be available at `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

**Configure your `.env.local` file:**

```env
VUE_APP_API_URL=http://localhost:5000/api
VUE_APP_SOCKET_URL=http://localhost:5000
VUE_APP_NAME=e-Service
```

```bash
# Start development server
npm run serve

# Or build for production
npm run build
```

The frontend will be available at `http://localhost:8080`

---

## 🐳 Docker Deployment

For easier deployment, use Docker:

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📚 API Documentation

### Authentication Endpoints

```http
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
GET    /api/auth/me              # Get current user
POST   /api/auth/forgot-password # Request password reset
PUT    /api/auth/reset-password  # Reset password
```

### User Endpoints

```http
GET    /api/users                # Get all users (Admin)
GET    /api/users/:id            # Get user by ID
PUT    /api/users/:id            # Update user
DELETE /api/users/:id            # Delete user
PUT    /api/users/:id/avatar     # Update user avatar
```

### Service Endpoints

```http
GET    /api/services             # Get all services
POST   /api/services             # Create service (Provider)
GET    /api/services/:id         # Get service details
PUT    /api/services/:id         # Update service
DELETE /api/services/:id         # Delete service
GET    /api/services/search      # Search services
POST   /api/services/:id/media   # Upload service media
```

### Booking Endpoints

```http
GET    /api/bookings             # Get user bookings
POST   /api/bookings             # Create booking
GET    /api/bookings/:id         # Get booking details
PUT    /api/bookings/:id         # Update booking status
DELETE /api/bookings/:id         # Cancel booking
```

For complete API documentation, see [API.md](docs/API.md)

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                    # Run all tests
npm run test:unit          # Run unit tests
npm run test:integration   # Run integration tests
npm run test:coverage      # Generate coverage report
```

### Frontend Tests

```bash
cd frontend
npm run test:unit          # Run unit tests
npm run test:e2e          # Run end-to-end tests
```

---

## 🎨 Demo

### Screenshots

<div align="center">

#### Home Page
![Home Page](https://via.placeholder.com/800x450/4A90E2/ffffff?text=Home+Page)

#### Service Listing
![Service Listing](https://via.placeholder.com/800x450/4A90E2/ffffff?text=Service+Listing)

#### Provider Dashboard
![Dashboard](https://via.placeholder.com/800x450/4A90E2/ffffff?text=Provider+Dashboard)

</div>

### Live Demo

🔗 **[Try the Live Demo](https://e-service-demo.netlify.app)** *(Replace with actual demo link)*

**Demo Credentials:**
- Customer: `demo@customer.com` / `password123`
- Provider: `demo@provider.com` / `password123`

---

## 🗺️ Roadmap

- [x] User authentication & authorization
- [x] Service provider profiles
- [x] Booking system
- [x] File upload (images/videos)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time chat between customers and providers
- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Push notifications
- [ ] AI-powered service recommendations
- [ ] Video consultation feature

See the [open issues](https://github.com/ayoub1999hannachi/e-service/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ayoub Hannachi**

- 🌐 GitHub: [@ayoub1999hannachi](https://github.com/ayoub1999hannachi)
- 💼 LinkedIn: [Ayoub Hannachi](https://www.linkedin.com/in/ayoub-hannachi-0727931b0/)
- 📧 Email: ayoub.hannachi@example.com

---

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/) - Backend runtime
- [Vue.js](https://vuejs.org/) - Frontend framework
- [Vuetify](https://vuetifyjs.com/) - Material Design components
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework
- All contributors who have helped this project grow

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/ayoub1999hannachi/e-service?style=social)
![GitHub forks](https://img.shields.io/github/forks/ayoub1999hannachi/e-service?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/ayoub1999hannachi/e-service?style=social)
![GitHub issues](https://img.shields.io/github/issues/ayoub1999hannachi/e-service)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ayoub1999hannachi/e-service)

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star! ⭐

**Built with ❤️ by [Ayoub Hannachi](https://github.com/ayoub1999hannachi)**

*"Connecting communities, one service at a time"*

</div>
