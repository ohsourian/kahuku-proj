<template>
  <div v-if="isOpen" class="overlay" @click="onClose">
    <div class="glass glass-dark modal-card">
      <div class="card-header">
        <span @click="onClose">⨯</span>
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
  emits: ["close"],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(`foo: ${this.isOpen}`);
  },
  methods: {
    onClose() {
      return this.$emit("close");
    },
  },
});
</script>
<style lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-card {
  display: inline-block;
  position: relative;
  z-index: 10;
  min-width: 300px;
  height: 500px;

  .card-header {
    display: flex;
    justify-content: right;

    span {
      font-size: 20pt;
      color: $gray;
      cursor: pointer;

      &:hover,
      &:active {
        color: $white;
      }
    }
  }
}
</style>
