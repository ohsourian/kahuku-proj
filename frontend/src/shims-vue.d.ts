/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "vue-navigator-share";
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.json" {
  const value: any;
  export default value;
}
