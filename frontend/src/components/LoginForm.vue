<template> 
<v-col cols="2" class="d-flex align-center">
        <v-btn @click="goToHome" icon>
          <v-icon class="text--primary">mdi-home</v-icon>
        </v-btn>
      </v-col>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
           
            <span class="headline ml-2">Login</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="login">
              <v-text-field
                v-model="form.email"
                label="Email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
                :rules="[rules.required]"
              ></v-text-field>
              <v-btn type="submit" color="primary" :disabled="!valid">Login</v-btn>
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <div class="mt-2 text-center">
              <span>Don't have an account? </span>
              <span @click="goToSignup" class="text--primary font-weight-bold cursor-pointer">Create Account</span>
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
      form: {
        email: '',
        password: ''
      },
      valid: true,
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.'
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/users/login',
          this.form,
          { withCredentials: true }
        );
        this.$store.dispatch('loginUser', response.data.user);
        this.$router.push({ name: 'profile' });
      } catch (error) {
        this.error = error.response?.data?.msg || 'Login failed';
      }
    },
    goToHome() {
      this.$router.push({ name: 'home' }); // Adjust to your home route
    },
    goToSignup() {
      this.$router.push({ name: 'SignupClient' }); // Adjust to your signup route
    }
  }
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff; /* White background for contrast */
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Softer shadow */
}

.cursor-pointer {
  cursor: pointer; /* Change cursor to pointer for the text */
}
</style>
