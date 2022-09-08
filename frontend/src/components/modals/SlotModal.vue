<template>
  <Modal :is-open="visual" @close="closeModal">
    
  </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SlotModal",
  emits: ["close"],
  props: {
    visual: {
      type: Boolean,
      required: true,
    },
    slots: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  mounted() {
    console.log(this.visual);
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
});
</script>
<style lang="scss" scoped></style>
