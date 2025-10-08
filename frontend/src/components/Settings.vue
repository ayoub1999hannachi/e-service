<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span class="headline">Settings</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="saveSettings">
                <v-text-field
                  v-model="settings.apiUrl"
                  label="API URL"
                  required
                ></v-text-field>
                <v-switch
                  v-model="settings.debugMode"
                  label="Debug Mode"
                ></v-switch>
                <v-btn type="submit" color="primary" :disabled="!valid">
                  Save Settings
                </v-btn>
                <v-alert v-if="success" type="success" class="mt-3">{{ success }}</v-alert>
                <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
              </v-form>
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
        settings: {
          apiUrl: '',
          debugMode: false
        },
        valid: false,
        error: null,
        success: null
      };
    },
    methods: {
      async saveSettings() {
        if (!this.$refs.form.validate()) return;
  
        try {
          await axios.post('http://localhost:8000/api/settings', this.settings);
          this.success = 'Settings saved successfully!';
          this.error = null;
        } catch (error) {
          this.error = 'Failed to save settings. Please try again.';
          this.success = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .v-form {
    margin-top: 20px;
  }
  </style>
  