<template>
  <button
    v-if="type === 'round' || type === 'pill'"
    :class="`${type} ${sizedClass} ${color} ${name}`"
  ></button>
  <button
    v-else-if="type === 'regular'"
    :class="`${type} ${sizedClass} ${color} ${afterClass}`"
  >
    {{ name }}
  </button>
  <button v-else-if="type === 'none'" :class="`${type}`">
    {{ name }}
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

type BtnStyle = "round" | "pill" | "regular" | "none";
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
      default: "",
    },
    size: {
      type: String as PropType<BtnSize>,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    after: {
      type: String,
      default: "",
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
    afterClass(): string {
      if (this.after?.length) {
        return `after after-${this.after}`;
      }
      return "";
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  cursor: pointer;
  color: $white;
}

.round,
.pill {
  @include clean();
  box-sizing: border-box;
  border: 2px solid $white;
  background-color: transparent;

  &-md {
    width: 58px;
    height: 36px;
    border-radius: 10rem;
  }
}

.regular {
  @include clean();
  box-sizing: border-box;
  border-radius: 10rem;

  &-md {
    font-size: 22px;
    width: 280px;
    height: 52px;
  }

  &-lg {
    font-size: 32px;
    font-weight: bold;
    width: 380px;
    height: 65px;
  }
}

.none {
  @include clean();
  text-decoration: underline;
  background-color: transparent;
  font-size: 18px;
  color: $primary;
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

.primary {
  &-fill {
    background-color: $primary;

    &:hover,
    &:active {
      background-color: $gray;
    }
  }

  &-wb {
    border-color: $primary;

    &:hover,
    &:active {
      background-color: $primary;
    }
  }

  &:hover,
  &:active {
    border-color: $primary;
    background-color: $primary;
  }
}

.secondary {
  &-fill {
    background-color: $secondary;

    &:hover,
    &:active {
      background-color: $gray;
    }
  }

  &:hover,
  &:active {
    border-color: $primary;
    background-color: $primary;
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

.after {
  &-down:after {
    @include img(down);
    margin-left: 10px;
    content: "";
    display: inline-block;
    width: 23px;
    height: 23px;
  }
}
</style>
