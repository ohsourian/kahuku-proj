<template>
  <NavBar />
  <section class="body-wrapper">
    <SideMenu v-if="menuToggle" />
    <div class="content-area">
      <router-view />
    </div>
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
  display: flex;

  .content-area {
    flex: 1;
    padding-left: 60px;
    padding-right: 60px;
  }
}
</style>
