<template>
  <v-app-bar color="teal-darken-4">
    <div class="d-flex align-center">
      <v-img :src="logo" alt="logo" class="logo-img" />
      <v-title class="awesome-font">Men darek</v-title> <!-- Title with custom font -->
    </div>
    <v-spacer></v-spacer>

    <!-- User's Full Name Display -->
    <template v-if="user">
      <span class="welcome-message">Welcome,<span class="user-fullname">{{user.fullname}}</span>!</span>
    </template>


    <!-- Conditional Messaging Button -->
    <template v-if="isAuthenticated">
      <v-btn icon @click="goToMessages">
        <v-icon>mdi-message-text</v-icon>
      </v-btn>
    </template>

    <!-- Conditional Buttons -->
    <template v-if="!isAuthenticated">
      <v-btn icon @click="goToCreateAccount">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn icon @click="goToLogin">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-btn icon @click="goToProfile">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>

  <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <!-- Card content goes here -->
  </v-card>
</template>

<script>
import logo from "../assets/logo.png";
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      logo
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userProfile']),
    user() {
      return this.userProfile;
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchUserInfo();
    }
  },
  methods: {
    ...mapActions(['loginUser', 'logoutUser']),
    goToCreateAccount() {
      this.$router.push({ name: 'CreateAccount' });
    },
    goToLogin() {
      this.$router.push({ name: 'LoginForm' });
    },
    goToProfile() {
      if (this.user && this.user._id) {
        this.$router.push({ name: 'profile', params: { userId: this.user._id } });
      } else {
        console.error('User is not logged in or user ID is missing');
      }
    },
    goToMessages() {
      this.$router.push({ name: 'message' }); // Navigate to the messages page
    },
    async logout() {
      try {
        // Clear session on server
        await axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true });

        // Update Vuex state and local state
        await this.logoutUser();

        // Redirect to login page
        this.$router.push({ name: 'LoginForm' });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async fetchUserInfo() {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile', { withCredentials: true });
        this.loginUser(response.data); // Sync Vuex store
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  }
};
</script>

<style>
.d-flex {
  display: flex;
  align-items: center;
}
.logo-img {
  width: 100px; /* Adjust as needed */
}
.ml-2 {
  margin-left: 8px; /* Adjust as needed */
}
.awesome-font {
  font-family: 'Your Custom Font', sans-serif; /* Replace with your desired font */
  font-size: 24px; /* Adjust as needed */
  font-weight: bold; /* Make it bold or adjust as needed */
}
.user-fullname {
  font-size: 16px; /* Adjust the size for user’s name */
  color: white; /* Adjust color if necessary */
  margin-left: 16px; /* Space between title and user name */
}
.welcome-message {
  font-size: 16px; /* Adjust the size for welcome message */
  color: white; /* Adjust color if necessary */
  margin-left: 16px; /* Space between title and welcome message */
}
</style>
