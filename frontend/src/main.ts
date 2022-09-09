import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ModalComp from "@/components/display/ModalComp.vue";
import ButtonComp from "@/components/display/ButtonComp.vue";
import mixins from "@/mixins";

createApp(App)
  .use(store)
  .use(router)
  .mixin(mixins)
  .component("Modal", ModalComp)
  .component("Btn", ButtonComp)
  .mount("#app");
