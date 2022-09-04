<template>
  <div id="logo" :class="`cc cc-${size}`">
    <img :src="require(`@/assets/images/${kind}@2x.${ext}`)" :alt="kind" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoComp",
  props: {
    size: { type: Number, required: true, default: 0 },
    kind: { type: String, required: true, default: "" },
    ext: { type: String, default: "png" },
  },
});
</script>
<style lang="scss" scoped>
#logo {
  img {
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:active {
    cursor: pointer;
  }
}
</style>
