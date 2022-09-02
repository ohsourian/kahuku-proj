import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ModalComp from "@/components/display/ModalComp.vue";
import ButtonComp from "@/components/display/ButtonComp.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("Modal", ModalComp)
  .component("Btn", ButtonComp)
  .mount("#app");
