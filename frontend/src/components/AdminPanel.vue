<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-tabs background-color="#f5f5f5" dark>
          <v-tab>
            <v-icon>mdi-account-group</v-icon>
            User Management
          </v-tab>
          <v-tab>
            <v-icon>mdi-chart-bar</v-icon>
            Statistics
          </v-tab>
          <v-tab>
            <v-icon>mdi-cogs</v-icon>
            Settings
          </v-tab>
          <v-tab>
            <v-icon>mdi-plus</v-icon>
            Add Specification
          </v-tab>
        </v-tabs>
        <v-tabs-items>
          <v-tab-item>
            <UserManagement />
          </v-tab-item>
          <v-tab-item>
            <Statistics />
          </v-tab-item>
          <v-tab-item>
            <Settings />
          </v-tab-item>
          <v-tab-item>
            <AddSpec />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserManagement from './UserManagement.vue';
import Statistics from './Statistics.vue';
import Settings from './Settings.vue';
import AddSpec from './addspec.vue';

export default {
  components: {
    UserManagement,
    Statistics,
    Settings,
    AddSpec
  }
};
</script>

<style scoped>
.v-tabs {
  margin-bottom: 20px;
}
</style>
