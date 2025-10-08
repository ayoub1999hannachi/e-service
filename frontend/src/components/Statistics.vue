<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>
            <span class="headline">User Statistics</span>
          </v-card-title>
          <v-card-text>
            <v-chart :options="userStatsOptions"></v-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title>
            <span class="headline">Activity Overview</span>
          </v-card-title>
          <v-card-text>
            <v-chart :options="activityStatsOptions"></v-chart>
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
      userStatsOptions: {
        // Sample data for user statistics chart
        chart: { type: 'bar' },
        title: { text: 'Users Overview' },
        series: [{ name: 'Users', data: [10, 20, 30, 40, 50] }],
        xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }
      },
      activityStatsOptions: {
        // Sample data for activity chart
        chart: { type: 'line' },
        title: { text: 'Activity Over Time' },
        series: [{ name: 'Activities', data: [1, 2, 3, 4, 5] }],
        xAxis: { categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'] }
      }
    };
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
