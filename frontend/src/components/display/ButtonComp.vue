<template>
  <button
    v-if="type === 'round' || type === 'pill'"
    :class="`${type} ${sizedClass} ${color} ${name}`"
  ></button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

type BtnStyle = "round" | "pill" | "regular";
type BtnSize = "sm" | "md" | "lg";
type BtnColor = "primary" | "info" | "warning" | "danger" | "purple";
export default defineComponent({
  name: "ButtonComp",
  props: {
    type: {
      type: Object as PropType<BtnStyle>,
      required: true,
    },
    color: {
      type: Object as PropType<BtnColor>,
      required: true,
    },
    size: {
      type: Object as PropType<BtnSize>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    sizedClass(): string {
      if (this.type === "round") {
        switch (this.size) {
          case "lg":
            return "cc cc-64";
          case "md":
            return "cc cc-36";
          case "sm":
            return "cc cc-20";
        }
      }
      return this.size;
    },
  },
});
</script>
<style lang="scss" scoped>
.round,
.pill {
  @include clean();
  box-sizing: border-box;
  cursor: pointer;
  border: 2px solid $white;
  background-color: transparent;
}

.info {
  border-color: $info;
}

.orange {
  border-color: $orange;
}

.warning {
  border-color: $warning;
  &:hover,
  &:active {
    background-color: $warning;
  }
}

.danger {
  border-color: $danger;
}

.purple {
  border-color: $purple;
}

.brush {
  @include img(brush-info);

  &:hover,
  &:active {
    @include img(brush);
  }
}

.crown {
  @include img(crown-warning);

  &:hover,
  &:active {
    @include img(crown);
  }
}
</style>
