<template>
  <div class="layout">
    <v-layout>
      <v-main>
        <!-- Carousel Section -->
        <v-carousel height="500px" hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in carouselItems"
            :key="i"
            :src="item.src"
            class="d-flex justify-center align-center"
            cover
          >
            <v-sheet
              color="rgba(0, 0, 0, 0.4)"
              height="100%"
              width="100%"
              class="d-flex flex-column justify-center align-center"
            >
              <v-row justify="center">
                <v-col cols="12" class="text-center white--text">
                  <h1>{{ item.title }}</h1>
                  <p class="text-h5">{{ item.subtitle }}</p>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <!-- Welcome Message -->
        <v-container>
          <v-row justify="center" class="my-10">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <v-card class="pa-6 elevation-2" outlined>
                <h2 class="font-weight-bold mb-3">Explore Our Specialties and Locations</h2>
                <p class="text-h5">Discover the various specialties and locations we offer and choose the one that suits you best.</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid>
  <v-row align="stretch" no-gutters class="specialties-row">
    <v-col
      v-for="specialite in specialites"
      :key="specialite._id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      class="d-flex"
    >
      <v-hover v-slot:default="{ isHovering }">
        <v-card
          :elevation="isHovering ? 12 : 4"
          class="mx-1 my-3 flex-grow-1 hover-card"  
          max-width="300"  
          border-radius="150px"
          
        >
          <!-- Specialite image with reduced height -->
          <v-img
            :src="`http://localhost:8000/${specialite.image}`"
            alt="Specialite Image"
            height="160px"
            
            class="white--text d-flex align-center justify-center card-img"
            @click="showUsers(specialite)"
          >
            <div class="overlay" v-if="isHovering"></div>
          </v-img>

          <!-- Specialite title with click event -->
          <v-card-title
            class="title text-h6"
            @click="showUsers(specialite)"
            style="cursor: pointer;"
          >
            {{ specialite.name }}
          </v-card-title>
          
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</v-container>

        <!-- Section to Display Locations -->
        <v-container fluid>
          <v-row align="stretch" no-gutters class="locations-row">
            <v-col
              v-for="location in locations"
              :key="location._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="d-flex"
            >
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 12 : 4"
                  class="mx-2 my-5 flex-grow-1"
                  max-width="400"
                >
                 
                    <v-card-title>{{ location.name }}</v-card-title>
                  

                  <v-card-actions>
                    <v-btn text color="primary" @click="showLocationDetails(location)">View Details</v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>

        <!-- Users Section -->
        <v-container fluid v-if="selectedSpecialty">
          <v-row align="stretch" no-gutters class="users-row">
            <v-col
              v-for="user in users"
              :key="user._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="d-flex"
            >
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 12 : 4"
                  class="mx-2 my-5 flex-grow-1"
                  max-width="400"
                >
                  <!-- User image -->
                  <v-img
                    :src="`http://localhost:8000/${user.image}`"
                    alt="User Image"
                    height="250px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
                    class="white--text d-flex align-center justify-center"
                  >
                    <v-avatar
                      size="200px"
                      class="d-flex align-center justify-center"
                    >
                      <img :src="`http://localhost:8000/${user.image}`" />
                    </v-avatar>
                    <v-card-title>{{ user.fullname }}</v-card-title>
                  </v-img>

                  <v-card-text class="text-center">
                    <p>{{ user.location }}</p>
                    <p>{{ user.description }}</p>
                  </v-card-text>

                  <!-- Button to view user profile -->
                  <v-card-actions>
                    <v-btn text color="primary" @click="goToProfile(user._id)">Afficher Profile</v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Header and Footer -->
      <Header />
    </v-layout>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios"; // Import axios to fetch data

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      specialites: [], // Data property to store the list of Specialties
      locations: [], // Data property to store the list of Locations
      users: [], // Data property to store the list of users for the selected specialty
      selectedSpecialty: null, // Data property to store the selected specialty
      carouselItems: [
        { src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg", title: "Explore Nature", subtitle: "Discover the beauty of nature" },
        { src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg", title: "Luxury Hotels", subtitle: "Experience world-class luxury" },
        { src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", title: "Sunny Beaches", subtitle: "Feel the warmth of the sun" },
      ],
    };
  },
  methods: {
    async fetchSpecialites() {
      try {
        const response = await axios.get("http://localhost:8000/api/specialites");
        this.specialites = response.data;
      } catch (error) {
        console.error("There was an error fetching the specialites:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get("http://localhost:8000/api/location");
        this.locations = response.data;
      } catch (error) {
        console.error("There was an error fetching the locations:", error);
      }
    },
    async showUsers(specialite) {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/users/specialite/${specialite._id}`);
    this.selectedSpecialty = specialite; // Set the selected specialty
    
    if (response.data.length === 0) {
      this.users = []; // Clear users array
      this.noUsersMessage = "No users found for this specialty.";
    } else {
      this.users = response.data;
      this.noUsersMessage = ""; // Clear any previous message
    }
  } catch (error) {
    console.error("There was an error fetching the users:", error);
    this.noUsersMessage = "An error occurred while fetching users.";
  }
},

    showLocationDetails(location) {
      // Implement the functionality to show location details
      console.log("Location details:", location);
    },
    goToProfile(userId) {
      // Redirect to the user profile page with the user ID
      this.$router.push({ name: 'UserProfile', params: { id: userId } });
    },
  },
  created() {
    this.fetchSpecialites(); // Fetch specialties when the component is created
    this.fetchLocations(); // Fetch locations when the component is created
  },
};
</script>

<style scoped>
/* Custom styles */
.v-card:hover {
  transform: scale(1.05); /* Enlarge on hover */
}

.v-img {
  object-fit: cover;
}

.v-avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #3F51B5;
}

.v-carousel-item {
  transition: 0.5s ease-in-out;
}

.v-carousel-item:hover {
  transform: scale(1.02);
}

.header-fixed {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}

/* Custom styles for horizontal layout */
.specialties-row, .users-row, .locations-row {
  flex-wrap: nowrap;
  overflow-x: auto;
}



.card-img {
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.card-img:hover {
  transform: scale(1.05);
}

.overlay {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.title {
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #424242;
}

.hover-card {
  transition: box-shadow 0.3s ease-in-out;
}

.hover-card:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}
</style>
