<template>
    <div class="add-specialite">
      <h1>Add New Specialite</h1>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="specialite.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input
            type="file"
            id="image"
            @change="handleFileUpload"
            required
          />
        </div>
        <button type="submit">Add Specialite</button>
        <div v-if="message" class="message">{{ message }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        specialite: {
          name: '',
          image: null
        },
        message: ''
      };
    },
    methods: {
      handleFileUpload(event) {
        this.specialite.image = event.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('name', this.specialite.name);
        formData.append('image', this.specialite.image);
  
        try {
          const response = await axios.post('http://localhost:8000/api/specialites', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.message = 'Specialite added successfully!';
          
          this.specialite.name = '';
          this.specialite.image = null;
        } catch (error) {
          this.message = 'Failed to add specialite. Please try again.';
          console.error('Error adding specialite:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-specialite {
    max-width: 500px;
    margin: auto;
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
  </style>
  