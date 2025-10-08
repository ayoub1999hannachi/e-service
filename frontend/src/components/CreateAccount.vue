<template>

  <div class="signup">
    <v-col cols="2" class="d-flex align-center">
        <v-btn @click="goToHome" icon>
          <v-icon class="text--primary">mdi-home</v-icon>
        </v-btn>
      </v-col>
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm" enctype="multipart/form-data" class="form-container">
      <div class="left-column">
        <div class="form-group">
          <label for="fullname">Full Name:</label>
          <input type="text" id="fullname" v-model="user.fullname" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="user.phone" />
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <select id="location" v-model="user.location" required>
            <option v-for="loc in locations" :key="loc._id" :value="loc._id">
              {{ loc.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
      </div>

      <div class="right-column">
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="user.description"></textarea>
        </div>
        <div class="form-group">
          <label for="specialite">Specialite:</label>
          <select id="specialite" v-model="user.specialite" required>
            <option v-for="spec in specialiteNames" :key="spec.id" :value="spec.id">
              {{ spec.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="profileimage">Upload ProfileImage:</label>
          <input type="file" id="profileimage" @change="handleFileUpload('profileimage', $event)" />
        </div>
        <div class="form-group">
          <label for="image">Upload Image:</label>
          <input type="file" id="image" @change="handleFileUpload('image', $event)" />
        </div>
        <div class="form-group">
          <label for="video">Upload Video:</label>
          <input type="file" id="video" @change="handleFileUpload('video', $event)" />
        </div>
        <div class="button-container">
        <button type="submit">Create Account</button>
      </div>
      </div>

      

      <div v-if="message" class="message">{{ message }}</div>

      <div v-if="imageUrl">
        <p>Uploaded Image:</p>
        <img :src="imageUrl" alt="Uploaded Image" />
      </div>
      <div v-if="profileimageUrl">
        <p>Uploaded ProfileImage:</p>
        <img :src="profileimageUrl" alt="Uploaded ProfileImage" />
      </div>
      <div v-if="videoUrl">
        <p>Uploaded Video:</p>
        <video :src="videoUrl" controls></video>
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        phone: '',
        location: '', // Will hold ObjectId
        password: '',
        description: '',
        specialite: '', // Will hold ObjectId
        image: null,
        video: null,
        profileimage: null,
      },
      specialiteNames: [], // Array to hold specialite names and IDs
      locations: [], // Array to hold location names and IDs
      message: '',
      imageUrl: '',
      videoUrl: '',
      profileimageUrl: '',
    };
  },
  mounted() {
    this.fetchSpecialiteNames(); // Fetch specialite names and IDs on load
    this.fetchLocations(); // Fetch locations on load
  },
  methods: {
    handleFileUpload(fileType, event) {
      this.user[fileType] = event.target.files[0];
    },
    async fetchSpecialiteNames() {
      try {
        const response = await axios.get('http://localhost:8000/api/specialites');
        this.specialiteNames = Array.isArray(response.data) 
          ? response.data.map(specialite => ({ id: specialite._id, name: specialite.name }))
          : [];
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get('http://localhost:8000/api/location');
        this.locations = Array.isArray(response.data) 
          ? response.data.map(location => ({ _id: location._id, name: location.name }))
          : [];
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    async submitForm() {
      const formData = new FormData();
      Object.entries(this.user).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      try {
        const response = await axios.post('http://localhost:8000/api/users/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.message = 'Account created successfully!';
        this.imageUrl = response.data.image; // Get the image URL from the response
        this.videoUrl = response.data.video; // Get the video URL from the response
        this.profileimageUrl = response.data.profileimage;
        this.resetForm();
      } catch (error) {
        this.message = error.response?.data?.message || 'Failed to create account. Please try again.';
        console.error('Error creating account:', error.response ? error.response.data : error.message);
      }
    },
    resetForm() {
      this.user = {
        fullname: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        description: '',
        specialite: '',
        image: null,
        video: null,
        profileimage: null,
      };
      this.imageUrl = '';
      this.videoUrl = '';
      this.profileimageUrl ='';
    },
  },
};
</script>
<style>
.signup {
  max-width: 800px; /* Adjusted for two-column layout */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-container {
  display: flex; /* Use flexbox for two columns */
}

.left-column,
.right-column {
  flex: 1; /* Equal width for both columns */
  margin-right: 20px; /* Space between columns */
}

.left-column {
  margin-right: 10px; /* Add right margin to left column */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input[type="file"] {
  padding: 5px;
}

.button-container {
  margin-top: 20px; /* Space above the button */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 15px;
  text-align: center;
  color: #d9534f;
}

img,
video {
  display: block;
  max-width: 100%;
  margin-top: 10px;
}
</style>

