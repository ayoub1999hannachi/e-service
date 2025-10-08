<template>
  <v-app>
    <!-- Toolbar (Top Navigation Bar) -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigate(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid>
        <router-view></router-view> <!-- Render different components based on route -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true, // Toggle sidebar drawer
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/dashboard/home' },
        { title: 'Profile', icon: 'mdi-account', route: '/dashboard/profile' },
        { title: 'Settings', icon: 'mdi-cog', route: '/dashboard/settings' },
        { title: 'Reports', icon: 'mdi-chart-bar', route: '/dashboard/reports' }
      ]
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
    logout() {
      // Clear authentication token
      localStorage.removeItem('token');
      
      // Redirect to login page
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
