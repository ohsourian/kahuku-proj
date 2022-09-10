import { createStore } from "vuex";
import { AlertComp, BootstrapScheme } from "@/types/Alert";

export default createStore({
  state: {
    menuToggle: false,
    alert: {
      isShow: false,
      message: "",
      type: "success",
    },
  },
  getters: {
    getMenuState(state) {
      return state.menuToggle;
    },
    getAlertIsShow(state) {
      return state.alert.isShow;
    },
  },
  mutations: {
    UPDATE_MENU_STATE(state, payload: boolean) {
      state.menuToggle = payload;
    },
    UPDATE_ALERT(state, payload: AlertComp) {
      state.alert = payload;
    },
  },
  actions: {
    updateMenuState(context, payload: boolean) {
      context.commit("UPDATE_MENU_STATE", payload);
    },
    showAlert(context, payload: { message: string; type: BootstrapScheme }) {
      const { message, type } = payload;
      context.commit("UPDATE_ALERT", { isShow: true, message, type });
    },
    hideAlert(context) {
      context.commit("UPDATE_ALERT", {
        isShow: false,
        message: "",
        type: this.state.alert.type,
      });
    },
  },
  modules: {},
});
