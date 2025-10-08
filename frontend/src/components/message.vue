<template>
  <Header />
  <v-container class="messages-container">
    <v-row>
      <v-col cols="4" class="users-list">
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(conversation, index) in conversations"
              :key="index"
              @click="toggleMessages(index)"
            >
              <v-list-item-avatar>
                <v-img :src="conversation.otherUser.image || 'default-avatar.png'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ conversation.otherUser.fullname }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="8" class="chat-window">
        <v-alert v-if="loading" type="info" class="loading">Loading messages...</v-alert>
        <div v-else class="messages-area" ref="messagesArea">
          <div v-if="selectedConversation" class="conversation-header">
            <v-btn icon @click="goToProfile(selectedConversation.otherUser._id)">
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <div class="receiver-name">
              {{ selectedConversation.otherUser.fullname }} - {{ selectedConversation.otherUser.specialite }}
            </div>
          </div>
          <div v-for="(message, index) in selectedConversationMessages" :key="message._id">
            <div v-if="isNewDay(message.timestamp, index)" class="message-date">
              {{ formatDate(message.timestamp) }}
            </div>
            <div :class="{
              'message-sender': message.sender._id === currentUser._id,
              'message-receiver': message.sender._id !== currentUser._id
            }">
              <v-card :class="getMessageStyle(message.sender._id)">
                <v-card-text>{{ message.content }}</v-card-text>
                <small class="timestamp">{{ formatTime(message.timestamp) }}</small>
              </v-card>
            </div>
          </div>
        </div>
        <div class="reply-area">
          <v-textarea
            v-model="replyContent"
            class="reply-input"
            label="Type your reply here..."
            outlined
            rows="2"
          ></v-textarea>
          <v-btn @click="sendReply(selectedConversation.otherUser._id)" class="send-button" color="primary" icon>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adjust if your server is hosted elsewhere

export default {
  data() {
    return {
      messages: [],
      loading: true,
      conversations: [],
      replyContent: '',
      currentUser: this.$store.state.user, // Assuming current user is saved in Vuex
      selectedConversation: null
    };
  },
  computed: {
    selectedConversationMessages() {
      return this.selectedConversation ? this.selectedConversation.messages : [];
    }
  },
  async created() {
    await this.fetchMessages();
    
    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      this.addMessageToConversation(message);
    });
  },
  beforeDestroy() {
    socket.off('receiveMessage'); // Clean up the listener when the component is destroyed
  },
  methods: {
    toggleMessages(index) {
      this.selectedConversation = this.conversations[index];
      this.sortMessages();
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  
    sortMessages() {
      if (this.selectedConversation) {
        this.selectedConversation.messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }
    },

    goToProfile(userId) {
      // Implement navigation to the user profile page
      this.$router.push({ name: 'UserProfile', params: { id: userId } }); // Adjust as necessary
    },

    async fetchMessages() {
      const userId = this.currentUser._id;
      if (!userId) {
        console.error('User ID is undefined');
        this.loading = false;
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/messages/${userId}`);
        this.messages = response.data;
        this.groupMessages(userId);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        this.loading = false;
      }
    },

    groupMessages(currentUserId) {
      const grouped = {};
      this.messages.forEach(message => {
        const partner = message.sender._id === currentUserId ? message.receiver : message.sender;
        const key = message.sender._id < message.receiver._id
          ? `${message.sender._id}-${message.receiver._id}`
          : `${message.receiver._id}-${message.sender._id}`;

        if (!grouped[key]) {
          grouped[key] = {
            otherUser: partner,
            messages: [],
            showMessages: false
          };
        }
        grouped[key].messages.push(message);
      });

      this.conversations = Object.values(grouped);
    },

    async sendReply(receiverId) {
      const userId = this.currentUser._id;
      if (!this.replyContent.trim()) return;

      const newMessage = {
        _id: Date.now(), // Temporary ID
        sender: { _id: userId, fullname: this.currentUser.fullname },
        receiver: { _id: receiverId },
        content: this.replyContent,
        timestamp: new Date().toISOString()
      };

      try {
        // Send the reply to the server
        await axios.post('http://localhost:8000/api/messages/send', {
          sender: userId,
          receiver: receiverId,
          content: this.replyContent
        });

        // Emit the message to Socket.io
        socket.emit('sendMessage', newMessage);

        // Update the selected conversation messages locally
        this.selectedConversation.messages.push(newMessage);
        this.replyContent = ''; // Clear the reply input
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });

      } catch (error) {
        console.error('Error sending reply:', error);
      }
    },

    addMessageToConversation(message) {
      // Find the conversation based on sender and receiver
      const key = message.sender._id < message.receiver._id
        ? `${message.sender._id}-${message.receiver._id}`
        : `${message.receiver._id}-${message.sender._id}`;

      const conversation = this.conversations.find(conv => 
        (conv.otherUser._id === message.sender._id || conv.otherUser._id === message.receiver._id)
      );

      if (conversation) {
        conversation.messages.push(message);
        this.sortMessages(); // Sort messages again to keep the latest first
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    getMessageStyle(senderId) {
      return senderId === this.currentUser._id ? 'message-left' : 'message-right';
    },
    
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    
    isNewDay(timestamp, index) {
      if (index === 0) return true;
      const currentDate = new Date(timestamp).toDateString();
      const previousDate = new Date(this.selectedConversationMessages[index - 1].timestamp).toDateString();
      return currentDate !== previousDate;
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesArea;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }
};
</script>

<style>
.messages-container {
  height: 100vh;
  background-color: #f5f5f5;
}

.users-list {
  border-right: 1px solid #ddd;
}

.chat-window {
  padding: 20px;
}

.messages-area {
  height: calc(70vh - 60px); /* Adjust to account for header and input area */
  overflow-y: auto;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.reply-area {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.reply-input {
  flex-grow: 1;
  margin-right: 10px;
}

.send-button {
  min-width: 50px;
  background-color: #1976d2;
  color: white;
}

.send-button:hover {
  background-color: #155a8a;
}

.message-sender {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.message-receiver {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.message-left {
  background-color: #e0f7fa;
}

.message-right {
  background-color: #ffe0b2;
}

.timestamp {
  font-size: 0.75em;
  color: gray;
}

.message-date {
  text-align: center;
  font-size: 0.9em;
  color: gray;
  margin: 10px 0;
}

.conversation-header {
  position: fixed; /* Relative to the chat window container */
  height: 60px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(56, 66, 153);
  z-index: 1000;
  width: 100%; /* Ensures the header takes full width of the chat window */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
top: 0; }

</style>
