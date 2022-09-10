<template>
  <div id="footer">
    <span>© 2022 KYSA AMS Workbench, All Rights Reserved</span>
    <span>feedback</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComp",
});
</script>
<style lang="scss">
#footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  height: 96px;
  width: 100%;
  border-top: 2px solid $gray-800;

  span,
  a {
    display: inline-block;
    color: $gray;
    font-size: 8pt;
    font-weight: lighter;
    margin-bottom: 8px;
  }
}
</style>
