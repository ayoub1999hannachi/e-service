<template>
  <v-col cols="2" class="d-flex align-center">
    <v-btn @click="goToHome" icon>
      <v-icon class="text--primary">mdi-home</v-icon>
    </v-btn>
  </v-col>

  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Create Client Account</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm" v-model="valid">
              <v-text-field
                v-model="user.fullname"
                label="Full Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                :rules="[rules.required, rules.password]"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" :loading="loading">Create Client Account</v-btn>
              <v-alert v-if="message" type="success" class="mt-2">{{ message }}</v-alert>
              <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
            </v-form>
            <div class="mt-2 text-center">
              <span>You have an account? </span>
              <span @click="goToLogin" class="text--primary font-weight-bold cursor-pointer">Login now</span>
            </div>
            <div class="mt-2 text-center">
              <span>You want to work? </span>
              <span @click="goTocreateaccount" class="text--primary font-weight-bold cursor-pointer">be with specialite</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        password: '',
      },
      message: '',
      error: '',
      valid: true,
      loading: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || 'E-mail must be valid.';
        },
        password: (value) => (value.length >= 6) || 'Password must be at least 6 characters long.',
      },
    };
  },
  methods: {
    async submitForm() {
      this.loading = true; // Start loading
      const formData = new FormData();
      formData.append('fullname', this.user.fullname);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('role', 1);

      try {
        const response = await axios.post('http://localhost:8000/api/users/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.message = 'Client account created successfully!';
        this.resetForm();
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create client account. Please try again.';
        console.error('Error creating account:', error.response ? error.response.data : error.message);
      } finally {
        this.loading = false; // Stop loading
      }
    },
    resetForm() {
      this.user = {
        fullname: '',
        email: '',
        password: '',
      };
      this.message = '';
      this.error = '';
    },
    goToHome() {
      this.$router.push({ name: 'home' }); // Adjust to your home route
    },
    goToLogin() {
      this.$router.push({ name: 'LoginForm' }); // Adjust to your login route
    },
    goTocreateaccount() {
      this.$router.push({ name: 'CreateAccount' }); // Adjust to your login route
    }
  },
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff; /* White background for contrast */
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Softer shadow */
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

.text--primary {
  color: #1976d2; /* Primary color for links */
  text-decoration: underline;
}

.text--primary:hover {
  color: #0d47a1; /* Darker shade on hover */
}
</style>
