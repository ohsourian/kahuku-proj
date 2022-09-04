import { createStore } from "vuex";

export default createStore({
  state: {
    menuToggle: false,
  },
  getters: {
    getMenuState(state) {
      return state.menuToggle;
    },
  },
  mutations: {
    UPDATE_MENU_STATE(state, payload: boolean) {
      state.menuToggle = payload;
    },
  },
  actions: {
    updateMenuState(context, payload: boolean) {
      context.commit("UPDATE_MENU_STATE", payload);
    },
  },
  modules: {},
});
