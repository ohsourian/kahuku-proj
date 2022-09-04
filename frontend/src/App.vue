<template>
  <NavBar />
  <SideMenu v-if="menuToggle" />
  <router-view />
</template>
<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideMenu from "@/components/layouts/SideMenu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { SideMenu, NavBar },
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
  }
}
</style>
