import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    menuToggle: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
