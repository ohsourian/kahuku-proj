import { defineComponent } from "vue";
import lang from "@/assets/langs/LangSheet.json";
import $store from "@/store/index";

export default defineComponent({
  methods: {
    async $sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms));
    },
    $t(key: string): string {
      const langSheet: any = lang;
      const langSet = $store.getters.getLang;
      return langSheet[key][langSet] ?? key;
    },
  },
});
