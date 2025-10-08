<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-group">
        <label for="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          v-model="user.fullname"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          v-model="user.phone"
        />
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input
          type="text"
          id="location"
          v-model="user.location"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="user.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="specialite">Specialite:</label>
        <select
          id="specialite"
          v-model="user.specialite"
          required
        >
          <option v-for="spec in specialiteNames" :key="spec.id" :value="spec.id">{{ spec.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          @change="handleFileUpload('image', $event)"
        />
      </div>
      <div class="form-group">
        <label for="video">Upload Video:</label>
        <input
          type="file"
          id="video"
          @change="handleFileUpload('video', $event)"
        />
      </div>
      <button type="submit">Create Account</button>
      <div v-if="message" class="message">{{ message }}</div>
      <div v-if="imageUrl">
        <p>Uploaded Image:</p>
        <img :src="imageUrl" alt="Uploaded Image" />
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
        location: '',
        password: '',
        description: '',
        specialite: '', // Will now hold ObjectId
        image: null,
        video: null,
      },
      specialiteNames: [], // Array to hold specialite name and ID
      message: '',
      imageUrl: '',
      videoUrl: '',
    };
  },
  mounted() {
    this.fetchSpecialiteNames(); // Fetch specialite names and IDs on load
  },
  methods: {
    handleFileUpload(fileType, event) {
      this.user[fileType] = event.target.files[0];
    },
    async fetchSpecialiteNames() {
      try {
        const response = await axios.get('http://localhost:8000/api/specialites');
        if (Array.isArray(response.data)) {
          this.specialiteNames = response.data.map(specialite => ({
            id: specialite._id,  // Capture the ObjectId
            name: specialite.name // Capture the name
          }));
        } else {
          console.error('Expected array but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('fullname', this.user.fullname);
      formData.append('email', this.user.email);
      formData.append('phone', this.user.phone);
      formData.append('location', this.user.location);
      formData.append('password', this.user.password);
      formData.append('description', this.user.description);
      formData.append('specialite', this.user.specialite); // Now sending the ObjectId

      if (this.user.image) {
        formData.append('image', this.user.image);
      }
      if (this.user.video) {
        formData.append('video', this.user.video);
      }

      try {
        const response = await axios.post('http://localhost:8000/api/users/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.message = 'Account created successfully!';
        this.imageUrl = response.data.image; // Get the image URL from the response
        this.videoUrl = response.data.video; // Get the video URL from the response
        this.resetForm();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = `Error: ${error.response.data.message}`;
        } else {
          this.message = 'Failed to create account. Please try again.';
        }
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
      };
      this.imageUrl = '';
      this.videoUrl = '';
    },
  },
};
</script>

<style scoped>
.signup {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.message {
  margin-top: 1em;
  color: red;
}

img {
  max-width: 100%;
  height: auto;
}

video {
  max-width: 100%;
  height: auto;
}
</style>
