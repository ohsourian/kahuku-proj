import Vue from "vue";

declare module "vue" {
  interface ComponentCustomProperties {
    $sleep(ms: number): Promise<void>;
  }
}
