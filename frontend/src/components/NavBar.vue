<template>
  <div id="nav" :class="bgGradient">
    <Logo class="logo" kind="kysa-logo" :size="20" @click="toggleSideMenu" />
    <h3>2022 KYSA AMS <span>Workbench</span></h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Logo from "@/components/display/LogoComp.vue";

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
  },
  methods: {
    scrollListener() {
      console.log(window.scrollY);
      this.scrollY = window.scrollY;
    },
    toggleSideMenu() {
      this.$store.dispatch("updateMenuState", !this.menuToggle);
      console.log(`menu state ::: ${this.menuToggle}`);
    },
  },
});
</script>
<style lang="scss" scoped>
.grad {
  &-20 {
    background-color: rgba($darkbase, 0.2);
  }

  &-40 {
    background-color: rgba($darkbase, 0.4);
  }

  &-60 {
    background-color: rgba($darkbase, 0.6);
  }

  &-80 {
    background-color: rgba($darkbase, 0.8);
  }

  &-100 {
    background-color: rgba($darkbase, 1);
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

  .logo {
    margin-right: 15px;
  }

  h3 {
    @include clean();
    margin: auto 0;

    span {
      font-weight: lighter;
    }
  }
}
</style>
