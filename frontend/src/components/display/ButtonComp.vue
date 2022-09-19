<template>
  <button
    v-if="type === 'round' || type === 'pill'"
    :class="`${type} ${sizedClass} ${color} ${name}`"
  ></button>
  <button
    v-else-if="type === 'regular'"
    :class="`btn btn-${color} btn-${size} ${afterClass}`"
  >
    {{ name }}
  </button>
  <router-link
    v-else-if="type === 'router'"
    :class="`btn btn-${color} btn-${size} ${afterClass}`"
    :to="link"
    >{{ name }}
  </router-link>
  <button v-else-if="type === 'none'" :class="`${type} ${noneClass}`">
    {{ name }}
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

type BtnStyle = "round" | "pill" | "regular" | "router" | "none";
type BtnSize = "sm" | "md" | "lg" | "fit";
type BtnColor =
  | "primary"
  | "info"
  | "warning"
  | "danger"
  | "purple"
  | "legacy"
  | "light";
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
    link: {
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
    noneClass(): string {
      return `${this.type}-${this.color}`;
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  @include clean();
  cursor: pointer;
  color: $light;
}

.btn {
  box-sizing: border-box;

  &-md {
    font-size: $font-size-md;
    padding: 8px 45px;
  }

  &-fit {
    font-size: $font-size-md;
    width: 100%;
  }
}

.round,
.pill {
  box-sizing: border-box;
  border: 2px solid $light;
  background-color: transparent;

  &-md {
    width: 58px;
    height: 36px;
    border-radius: 10rem;
  }
}

.none {
  text-decoration: underline;
  background-color: transparent;
  font-size: 18px;

  &-primary {
    color: $primary;
  }

  &-secondary {
    color: $secondary;
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

.primary {
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

.success {
  &-wb {
    border-color: $success;

    &:hover,
    &:active {
      background-color: $success;
    }
  }

  &:hover,
  &:active {
    border-color: $success;
    background-color: $success;
  }
}

.secondary {
  &:hover,
  &:active {
    border-color: $secondary;
    background-color: $secondary;
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

.circle-right {
  @include img(circle-right);
}

.circle-left {
  @include img(circle-left);
}

.home {
  @include img(home);
}

.share {
  @include img(share);
}

.after {
  &-down:after {
    @include psudo(23px, down, left);
  }
}
</style>
