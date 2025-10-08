<template>
  <v-app>
    <Header />

    <div class="user-profile">
      <v-container>
        <v-row justify="center" class="my-10">
          <v-col>
            <v-card class="pa-5">
              <h3 v-if="user && user.fullname">Welcome to {{ user.fullname }}'s Profile</h3>
              <v-row>
                <v-col cols="6">
  <v-card class="details-zone d-flex" elevation="2" outlined>
     <!-- Right side (Profile and Cover Image) -->
     <div class="d-flex flex-column align-center">
      <v-img
        v-if="user && user.coverImage"
        :src="user.coverImage"
        height="200px"
        width="200px"
        class="cover-image mb-3"
      ></v-img>
      <v-avatar size="100" class="profile-avatar">
        <img :src="profileImage" v-if="user && user.profileimage" alt="Profile Image" />
      </v-avatar>
    </div>
    <!-- Left side (Details) -->
    <div class="d-flex flex-column justify-center">
      <v-card-title class="headline mt-2" v-if="user && user.fullname">{{ user.fullname }}</v-card-title>
      <v-card-subtitle v-if="user && user.location">
        <v-icon left>mdi-map-marker</v-icon>
        {{ user.location }}
      </v-card-subtitle>
      <v-card-subtitle v-if="user && user.specialite">
        <v-icon left>mdi-star</v-icon>
        {{ user.specialite }}
      </v-card-subtitle>
      <v-card-subtitle v-if="user && user.phone">
        <v-icon left>mdi-phone</v-icon>
        {{ user.phone }}
      </v-card-subtitle>
    </div>

  </v-card>
</v-col>


                <v-col cols="6">
                  <v-card class="about-me-zone" elevation="2" outlined>
                    <v-list v-if="messages && messages.length > 0" dense>
                      <v-list-item-group>
                        <v-list-item v-for="(message, index) in formattedMessages" :key="message._id" :class="{'text-end': message.isSender, 'text-start': !message.isSender}">
                          <v-subheader v-if="shouldDisplayDate(index)">{{ formatDate(message.timestamp) }}</v-subheader>
                          <v-list-item-content>
                            <v-list-item-title>
                              <strong>{{ message.isSender ? 'You' : user.fullname }}:</strong> {{ message.content }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-grey">{{ formatTime(message.timestamp) }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                    <p v-else>No messages yet.</p>

                    <div class="message-input-container">
                      <v-textarea v-model="newMessage" label="Send a message" rows="3" class="message-textarea"></v-textarea>
                      <v-btn icon color="primary" @click="sendMessage" :disabled="!newMessage.trim()">
                        <v-icon>mdi-send</v-icon>
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <v-col cols="6">
              <v-card class="about-me-zone" elevation="2" outlined>
                <h3 class="text-center">About Me</h3>
                <v-divider></v-divider>
                <v-card-text v-if="user && user.description">
                  <p>{{ user.description }}</p>
                </v-card-text>
              </v-card>
              </v-col>
              <v-divider></v-divider>
              <h3 class="text-center">Mine works</h3>
              <v-row>
                <v-col cols="6">
                  <v-card class="work-zone" elevation="2" outlined>
                    <v-img v-if="user && user.image" :src="userImage" alt="User Work" height="200px"></v-img>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="work-zone" elevation="2" outlined>
                    <div v-if="user && user.video" class="video-container">
                      <video controls :src="userVideo" class="rounded-video" height="200px"></video>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-btn text @click="goBack">Go Back</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    
  </v-app>
  <Footer />
</template>


<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Header from './Header.vue';
import Footer from './Footer.vue';
export default {
  components: {
    Header,
  },
  data() {
    return {
      user: null,
      messages: [],
      newMessage: "",
    };
  },
  computed: {
    ...mapState(['user']),
    profileImage() {
      return this.user && this.user.profileimage ? `http://localhost:8000/${this.user.profileimage}` : '';
    },
    userImage() {
      return this.user && this.user.image ? `http://localhost:8000/${this.user.image}` : '';
    },
    userVideo() {
      return this.user && this.user.video ? `http://localhost:8000/${this.user.video}` : '';
    
    },
    
    currentUserId() {
      return this.$route.params.id;
    },
    loggedInUserId() {
      return this.$store.state.user ? this.$store.state.user._id : null;
    },
    formattedMessages() {
      return this.messages.map((message) => ({
        ...message,
        isSender: message.sender._id === this.loggedInUserId,
      }));
    },
  },
  methods: {
    async fetchUserById() {
      const userId = this.currentUserId;
      try {
        const response = await axios.get(`http://localhost:8000/api/users/user/${userId}`);
        this.user = response.data;
        this.fetchMessages();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    },
    
    async fetchMessages() {
      if (this.loggedInUserId && this.user._id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/messages/user/${this.loggedInUserId}/${this.user._id}`);
          this.messages = response.data;
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) {
        return;
      }
      try {
        await axios.post('http://localhost:8000/api/messages/send', {
          sender: this.loggedInUserId,
          receiver: this.user._id,
          content: this.newMessage,
        });
        this.newMessage = '';
        this.fetchMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    shouldDisplayDate(index) {
      if (index === 0) return true;
      const currentMessageDate = new Date(this.messages[index].timestamp).toDateString();
      const previousMessageDate = new Date(this.messages[index - 1].timestamp).toDateString();
      return currentMessageDate !== previousMessageDate;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  },
  mounted() {
    this.fetchUserById();
  },
};
</script>

<style scoped>
.pa-5 {
  background-color: rgb(239, 240, 241);
}

.user-profile {
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.cover-image {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  
}

.profile-avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: 3px solid #3F51B5; /* Border around avatar */
}

.rounded-video {
  border-radius: 10px;
}

.headline {
  font-size: 2rem;
  font-weight: bold;
  color: #3F51B5; /* Primary color for headings */
}

.details-zone,
.about-me-zone,
.work-zone {
  margin: 20px 0;
  padding: 15px;
  background-color: #fff; /* White background for cards */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

.details-title {
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 1.2rem;
  color: #3F51B5;
}

.v-btn {
  margin-top: 10px;
}

.text-end {
  text-align: right;
}

.text-start {
  text-align: left;
}

.about-me-zone {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
}

.message-input-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.message-textarea {
  flex: 1;
  margin-right: 10px;
}

.v-list-item {
  padding: 10px 0;
}

.v-btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center; 
  justify-content: center; 
  background-color: #3F51B5; /* Primary color for button */
  color: white; /* White icon color */
}
v-app {
  min-height: 100vh; /* Ensure the main content takes full screen height */
  padding-bottom: 100px; /* Add space for the footer */
}
</style>
