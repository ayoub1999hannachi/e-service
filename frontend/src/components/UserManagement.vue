<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">User Management</span>
            <v-spacer></v-spacer>
            <v-btn @click="fetchUsers" color="primary">Refresh</v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="_id"
            class="elevation-1"
            :pagination.sync="pagination"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                append-icon="mdi-magnify"
              ></v-text-field>
            </template>
            <template v-slot:item.avatar="{ item }">
              <v-avatar size="40">
                <img :src="item.avatarUrl" alt="User Avatar" />
              </v-avatar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon @click="openUpdateDialog(item)" class="mr-2" color="blue">mdi-pencil</v-icon>
              <v-icon @click="deleteUser(item._id)" class="mr-2" color="red">mdi-delete</v-icon>
              <v-icon @click="openMessageDialog(item)" class="mr-2" color="green">mdi-message</v-icon>
            </template>
          </v-data-table>

          <!-- Update User Dialog -->
          <v-dialog v-model="updateDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Update User</span>
              </v-card-title>
              <v-card-subtitle>
                <v-text-field v-model="updateUser.fullname" label="Full Name"></v-text-field>
                <v-text-field v-model="updateUser.email" label="Email"></v-text-field>
                <v-text-field v-model="updateUser.phone" label="Phone"></v-text-field>
                <v-text-field v-model="updateUser.location" label="Location"></v-text-field>
                <v-select
                  v-model="updateUser.role"
                  :items="roles"
                  label="Role"
                  item-text="text"
                  item-value="value"
                ></v-select>
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text @click="updateDialog = false">Cancel</v-btn>
                <v-btn color="primary" @click="updateUserData">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Send Message Dialog -->
          <v-dialog v-model="messageDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Send Message</span>
              </v-card-title>
              <v-card-subtitle>
                <v-textarea v-model="messageContent" label="Message Content" rows="5"></v-textarea>
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text @click="messageDialog = false">Cancel</v-btn>
                <v-btn color="primary" @click="sendMessage">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      headers: [
        { text: 'Avatar', value: 'avatar', sortable: false },
        { text: 'Full Name', value: 'fullname' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      updateDialog: false,
      messageDialog: false,
      updateUser: {},
      messageContent: '',
      roles: [{ text: 'Admin', value: 1 }, { text: 'User', value: 0 }] // Define roles here
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        this.fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    openUpdateDialog(user) {
      this.updateUser = { ...user };
      this.updateDialog = true;
    },
    async updateUserData() {
      try {
        await axios.put(`http://localhost:8000/api/users/${this.updateUser._id}`, this.updateUser);
        this.updateDialog = false;
        this.fetchUsers(); // Refresh the list
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    openMessageDialog(user) {
      this.currentUser = user;
      this.messageDialog = true;
    },
    async sendMessage() {
      try {
        await axios.post('http://localhost:8000/api/messages', {
          userId: this.currentUser._id,
          content: this.messageContent
        });
        this.messageDialog = false;
        this.messageContent = ''; // Clear message content
        // Optionally, you might want to handle any success notification here
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
