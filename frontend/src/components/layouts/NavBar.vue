<template>
  <div id="nav" :class="bgGradient">
    <Logo class="logo" kind="kysa-logo" :size="20" @click="toggleSideMenu" />
    <h3 @click="toggleSideMenu">2022 KYSA AGG <span>Workbench</span></h3>
  </div>
  <div id="alert-area">
    <transition name="alert">
      <div
        v-if="alertShow"
        :class="`alert alert-${alertType} alert-dismissible fade show`"
      >
        {{ alertMessage }}
        <button type="button" class="btn-close" @click="hideAlert">⨯</button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Logo from "@/components/display/LogoComp.vue";
import { BootstrapScheme } from "@/types/Alert";

export default defineComponent({
  components: { Logo },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  data() {
    return { scrollY: 0 };
  },
  computed: {
    bgGradient(): string {
      const basePx = 100;
      const diff = 20;
      if (basePx > this.scrollY) {
        return `grad-${Math.floor(this.scrollY / diff) * diff}`;
      }
      return "grad-100";
    },
    menuToggle(): boolean {
      return this.$store.state.menuToggle;
    },
    alertShow(): boolean {
      return this.$store.state.alert.isShow;
    },
    alertMessage(): string {
      return this.$store.state.alert.message;
    },
    alertType(): BootstrapScheme {
      return this.$store.state.alert.type;
    },
  },
  watch: {
    async alertShow(newVal) {
      if (newVal) {
        await this.$sleep(3000);
        this.hideAlert();
      }
    },
  },
  methods: {
    scrollListener() {
      this.scrollY = window.scrollY;
    },
    toggleSideMenu() {
      this.$store.dispatch("updateMenuState", !this.menuToggle);
    },
    hideAlert() {
      this.$store.dispatch("hideAlert");
    },
  },
});
</script>
<style lang="scss" scoped>
.grad {
  &-20 {
    background-color: rgba($black, 0.2);
  }

  &-40 {
    background-color: rgba($black, 0.4);
  }

  &-60 {
    background-color: rgba($black, 0.6);
  }

  &-80 {
    background-color: rgba($black, 0.8);
  }

  &-100 {
    background-color: rgba($black, 1);
  }
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-content: center;
  padding: 16px;
  z-index: 2;

  .logo {
    margin-right: 15px;
  }

  h3 {
    @include clean();
    cursor: pointer;
    margin: auto 0;

    span {
      font-weight: lighter;
    }
  }
}

#alert-area {
  position: fixed;
  box-sizing: border-box;
  top: 72px;
  left: 0;
  z-index: 9;
  width: 100%;
  padding: 0 25%;

  .btn-close {
    @include clean();
    height: 100%;
    font-size: $font-size-lg;
    color: $gray-600;
    cursor: pointer;
    margin-right: 10px;
    background-color: transparent;
  }
}

.alert-enter-active {
  animation: fadeIn 0.3s;
}

.alert-leave-active {
  animation: fadeIn 0.3s reverse;
}
</style>
