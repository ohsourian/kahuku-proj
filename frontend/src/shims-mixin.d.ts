import Vue from "vue";
import ApiService from "@/services/api.service";

declare module "vue" {
  interface ComponentCustomProperties {
    $sleep(ms: number): Promise<void>;

    $api: ApiService;
  }
}
