import { createStore } from "vuex";
import { AlertComp, BootstrapScheme } from "@/types/Alert";
import { Lang } from "@/types/Common";

export default createStore({
  state: {
    menuToggle: false,
    isLeaderPeriod: false,
    showAbount: false,
    lang: "ko" as Lang,
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
    getLeaderPeriod(state) {
      return state.isLeaderPeriod;
    },
    getShowAbout(state) {
      return state.showAbount;
    },
    getLang(state) {
      return state.lang;
    },
  },
  mutations: {
    UPDATE_MENU_STATE(state, payload: boolean) {
      state.menuToggle = payload;
    },
    UPDATE_ALERT(state, payload: AlertComp) {
      state.alert = payload;
    },
    UPDATE_LEADER_PERIOD(state, payload: boolean) {
      state.isLeaderPeriod = payload;
    },
    TOGGLE_SHOW_ABOUT(state) {
      state.showAbount = !state.showAbount;
    },
    UPDATE_LANG(state, payload: Lang) {
      state.lang = payload;
    },
  },
  actions: {
    updateMenuState(context, payload: boolean) {
      context.commit("UPDATE_MENU_STATE", payload);
    },
    updateLeaderPeriod(context, payload: boolean) {
      context.commit("UPDATE_LEADER_PERIOD", payload);
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
    toggleShowAbout(context) {
      context.commit("TOGGLE_SHOW_ABOUT");
    },
    updateLang(context, payload: Lang) {
      context.commit("UPDATE_LANG", payload);
    },
  },
  modules: {},
});
