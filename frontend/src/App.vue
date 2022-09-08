<template>
  <NavBar />
  <section class="body-wrapper">
    <SideMenu v-if="menuToggle" />
    <router-view />
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
  },
});
</script>
<style lang="scss">
.body-wrapper {
  box-sizing: border-box;
  overflow: auto;
  display: flex;
}
</style>
