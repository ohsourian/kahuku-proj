import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    menuToggle: boolean;
    alert: AlertComp;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
