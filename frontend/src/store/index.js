// src/store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    error: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchProfile({ commit, state }) {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/user/${state.user._id}`);
        commit('setUser', response.data);
      } catch (error) {
        commit('setError', 'Failed to load profile you are not connected');
        console.error('Error fetching profile:', error);
      }
    },
    loginUser({ commit }, userData) {
      commit('setUser', userData);
    },
    logoutUser({ commit }) {
      commit('clearUser');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    userProfile: state => state.user
  },
  plugins: [createPersistedState()] // Persist state in session
});
