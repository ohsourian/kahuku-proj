<template>
  <div class="glass group-layout">
    <span class="box-label">1조</span>
    <MemberList v-for="index in 16" :key="index" />
  </div>
</template>
<script lang="ts">
import MemberList from "@/components/surfaces/MemberList.vue";

export default {
  components: { MemberList },
};
</script>
<style lang="scss" scoped>
.group-layout {
  display: inline-block;
  width: 365px;
  margin: 0.7rem;
}
</style>
