import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config.js";

export default {
  state: {
    user: null,
    authErrorMessage: null,
    authSuccessMessage: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, currentUser) {
      state.user = currentUser;
    },

    SET_AUTH_ERROR_MESSAGE(state, errorMessage) {
      state.authErrorMessage = errorMessage;
    },

    SET_AUTH_SUCCESS_MESSAGE(state, successMessage) {
      state.authSuccessMessage = successMessage;
    },
  },

  actions: {
    async createUser(
      { commit, dispatch },
      { username, email, password, confirmPassword }
    ) {
      try {
        if (email && password && password === confirmPassword) {
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!response.user)
            throw new Error("User creation failed: User object not available.");

          commit("SET_USER", response.user);
          dispatch("sendVerificationEmailToUser");
          return dispatch("updateProfileForCurrentUser", username);
        }
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async signInUser({ commit }, { email, password }) {
      try {
        if (email && password) {
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!response.user)
            throw new Error("User login failed: Something went wrong!.");

          commit("SET_USER", response.user);
          return response.user;
        }
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async signOutOfFirebase({ commit }) {
      try {
        await signOut(auth);

        return true;
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async sendVerificationEmailToUser() {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async updateProfileForCurrentUser({ commit, state }, displayName) {
      try {
        const currentUser = state.user;

        await updateProfile(currentUser, {
          displayName,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        });

        commit("SET_USER", { ...currentUser, displayName });

        return currentUser;
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async sendPasswordResetEmailToUser({ commit }, email) {
      try {
        if (email) {
          await sendPasswordResetEmail(auth, email);

          commit(
            "SET_AUTH_SUCCESS_MESSAGE",
            "Password Reset Email has been send. Please check your email inbox or spam."
          );
        }
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },
  },

  modules: {},
};
