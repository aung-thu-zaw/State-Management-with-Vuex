import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config.js";

export default {
  state: {
    user: null,
    authErrorMessage: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, currentUser) {
      state.user = currentUser;
    },

    SET_AUTH_ERROR_MESSAGE(state, errorMessage) {
      state.authErrorMessage = errorMessage;
    },
  },

  actions: {
    async createUser({ commit }, { username, email, password }) {
      try {
        if (email && password) {
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!response.user)
            throw new Error("User creation failed: User object not available.");

          commit("SET_USER", response.user);
          return response.user;
        }
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },
  },
  modules: {},
};
