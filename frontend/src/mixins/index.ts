import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    async $sleep(ms: number) {
      return new Promise((r) => setTimeout(r, ms));
    },
  },
});
