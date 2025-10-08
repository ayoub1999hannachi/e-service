<template>
    <v-container>
      <v-row>
        <v-col
          v-for="user in users"
          :key="user._id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto my-5" max-width="400">
            <v-img
              :src="`http://localhost:8000/uploads/${user.image || 'default.png'}`"
              height="250px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
              class="white--text d-flex align-center justify-center"
            >
              <v-avatar size="150px">
                <img :src="`http://localhost:8000/uploads/${user.image || 'default.png'}`" />
              </v-avatar>
            </v-img>
            <v-card-title>{{ user.fullname }}</v-card-title>
            <v-card-text>
              <p>Email: {{ user.email }}</p>
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
        users: [],
      };
    },
    async created() {
      const specialiteId = this.$route.params.specialiteId;
      try {
        const response = await axios.get(`http://localhost:8000/api/specialites/${specialiteId}/users`);
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users by specialite:', error);
      }
    },
  };
  </script>
  