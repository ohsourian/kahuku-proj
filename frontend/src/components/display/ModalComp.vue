<template>
  <div v-if="isOpen" class="overlay" @click.self="onClose()">
    <div class="glass modal-card">
      <div class="card-header">
        <span>{{ title }}</span>
        <span @click="onClose()">⨯</span>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
//TODO: [AMI] modal-card fade in
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComp",
  emits: ["closeModal"],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log(`foo: ${this.isOpen}`);
  },
  methods: {
    onClose() {
      return this.$emit("closeModal");
    },
  },
});
</script>
<style lang="scss" scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(7px);
}

.modal-card {
  display: inline-block;
  position: relative;
  z-index: 10;
  min-width: 300px;
  width: fit-content;

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    span {
      display: inline-block;
      font-size: 20pt;
      color: $gray;
      cursor: pointer;

      &:hover,
      &:active {
        color: $light;
      }
    }
  }
}
</style>
