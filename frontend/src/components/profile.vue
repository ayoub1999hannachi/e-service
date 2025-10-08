<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-center">
            <h2>User Profile</h2>
          </v-card-title>

          <v-card-text v-if="profile">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Full Name: {{ profile.fullname }}</v-list-item-title>
                  <v-list-item-subtitle>Email: {{ profile.email }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Location: {{ profile.location }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Specialty: {{ profile.specialite?.name || 'N/A' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="profile.image">
                <v-list-item-content>
                  <v-list-item-title>Profile Image:</v-list-item-title>
                  <v-img :src="profile.image" max-width="200" max-height="200" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="profile.video">
                <v-list-item-content>
                  <v-list-item-title>Profile Video:</v-list-item-title>
                  <video controls :src="profile.video" width="300"></video>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-text v-else>
            <v-alert type="error" v-if="error">{{ error }}</v-alert>
            <v-alert type="info" v-else>Loading profile...</v-alert>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="goToEditProfile">
              Edit Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters(['userProfile']),
    profile() {
      return this.userProfile;
    },
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    async loadProfile() {
      try {
        const userId = this.$store.state.user._id; // Retrieve userId from Vuex
        const response = await axios.get(`http://localhost:8000/api/users/user/${userId}`); // Fetch user profile
        this.$store.commit('setUser', response.data); // Update Vuex store with user data
      } catch (error) {
        this.$store.commit('setError', 'Failed to load profile'); // Set error in Vuex store
        console.error('Error fetching profile:', error);
      }
    },
    goToEditProfile() {
      this.$router.push({ name: 'EditProfile' });
    }
  },
  created() {
    this.loadProfile();
  }
};
</script>

<style scoped>
.v-icon {
  font-size: 4rem;
}
</style>
