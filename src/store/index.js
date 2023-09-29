import { createStore } from "vuex";
import authentication from "./modules/authentication";
import events from "./modules/events";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    events,
  },
});
