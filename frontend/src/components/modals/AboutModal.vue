<template>
  <Modal :is-open="isOpen" title="About Project" @closeModal="closeModal">
    <section class="modal-wrap"></section>
  </Modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutModal",
  computed: {
    isOpen() {
      return this.$store.getters.getShowAbout;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("toggleShowAbout");
    },
  },
});
</script>
<style lang="scss">
.modal-wrap {
  width: 430px;
}
</style>
