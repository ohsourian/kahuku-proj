import Vue from "vue";
import ApiService from "@/services/api.service";

declare module "vue" {
  interface ComponentCustomProperties {
    $sleep(ms: number): Promise<void>;

    $t(key: string): string;

    $api: ApiService;
  }
}
