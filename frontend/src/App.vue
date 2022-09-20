<template>
  <NavBar v-if="isPcView" />
  <section class="body-wrapper">
    <Transition name="slide">
      <SideMenu v-if="menuToggle" />
    </Transition>
    <router-view :key="$route.fullPath" />
  </section>
  <FooterComp />
</template>
<script lang="ts">
import NavBar from "@/components/layouts/NavBar.vue";
import SideMenu from "@/components/layouts/SideMenu.vue";
import { defineComponent } from "vue";
import Footer from "@/components/layouts/Footer.vue";

export default defineComponent({
  components: { FooterComp: Footer, SideMenu, NavBar },
  computed: {
    menuToggle(): boolean {
      return this.$store.state.menuToggle;
    },
    isPcView(): boolean {
      return this.$route.name !== "MobileView";
    },
  },
});
</script>
<style lang="scss">
.body-wrapper {
  box-sizing: border-box;
  display: flex;
}

.slide-enter-active {
  animation: slide 0.5s;
}

.slide-leave-active {
  animation: slide 0.3s reverse;
}

@keyframes slide {
  from {
    left: -200px;
  }
}
</style>
