import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
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

    async userReauthenticate({ commit }, password) {
      try {
        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(user.email, password);

        const response = await reauthenticateWithCredential(user, credential);

        if (!response) throw new Error("Wrong Password!");

        return response.user;
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

    async updateProfileForCurrentUser({ commit }, displayName) {
      try {
        const currentUser = auth.currentUser;

        await updateProfile(currentUser, {
          displayName,
          photoURL:
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg",
        });

        commit("SET_USER", { ...currentUser, displayName });

        return currentUser;
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },

    async updateAccountPassword(
      { commit, dispatch },
      { currentPassword, newPassword, confirmPassword }
    ) {
      try {
        if (currentPassword && newPassword === confirmPassword) {
          const response = await dispatch(
            "userReauthenticate",
            currentPassword
          );

          if (!response) throw new Error("Wrong Current Password!");

          await updatePassword(response, newPassword);
          commit(
            "SET_AUTH_SUCCESS_MESSAGE",
            "Your password is updated successfully"
          );

          return true;
        } else {
          throw new Error("Password does not exists");
        }
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

    async deleteUserAccount({ commit, dispatch }, password) {
      try {
        if (password) {
          const response = await dispatch("userReauthenticate", password);

          if (!response)
            throw new Error("Wrong Password : Password does not match !");

          await deleteUser(response);

          commit(
            "SET_AUTH_SUCCESS_MESSAGE",
            "Your account is deleted successfully."
          );

          return true;
        } else {
          throw new Error("Password does not exists");
        }
      } catch (error) {
        commit("SET_AUTH_ERROR_MESSAGE", error.message);
      }
    },
  },

  modules: {},
};
