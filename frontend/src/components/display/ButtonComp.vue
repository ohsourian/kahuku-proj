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
      type: String as PropType<BtnStyle>,
      required: true,
    },
    color: {
      type: String as PropType<BtnColor>,
      required: true,
    },
    size: {
      type: String as PropType<BtnSize>,
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
      return `${this.type}-${this.size}`;
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

  &-md {
    width: 58px;
    height: 36px;
    border-radius: 10rem;
  }
}

.info {
  &-wb {
    border-color: $info;

    &:hover,
    &:active {
      background-color: $info;
    }
  }

  &:hover,
  &:active {
    border-color: $info;
    background-color: $info;
  }
}

.orange {
  &:hover,
  &:active {
    border-color: $orange;
    background-color: $orange;
  }
}

.warning {
  &-wb {
    border-color: $warning;

    &:hover,
    &:active {
      background-color: $warning;
    }
  }

  &:hover,
  &:active {
    border-color: $warning;
    background-color: $warning;
  }
}

.danger {
  &:hover,
  &:active {
    border-color: $danger;
    background-color: $danger;
  }
}

.purple {
  &:hover,
  &:active {
    border-color: $purple;
    background-color: $purple;
  }
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

.arrow-right {
  @include img(arrow-right);
}

.up-down {
  @include img(up-down);
}

.group {
  @include img(group);
}

.person {
  @include img(person);
}
</style>
