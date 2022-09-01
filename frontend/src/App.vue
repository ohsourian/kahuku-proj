<template>
  <NavBar />
  <router-view />
</template>
<script>
import NavBar from "@/components/NavBar";
import { defineComponent } from "vue";

export default defineComponent({
  components: { NavBar },
});
</script>
<style lang="scss">
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_mixins.scss";
@import "@/assets/styles/app.module.scss";
</style>
