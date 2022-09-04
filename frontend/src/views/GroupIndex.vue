<template>
  <section class="main">
    <div class="contents">
      <span class="box-label">검색 옵션</span>
      <div class="glass options">
        <div>filter options</div>
        <div>applied</div>
      </div>
      <div class="board">
        <GroupCard v-for="index in 6" :key="index" />
      </div>
      <GroupFilterModal />
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";
import GroupFilterModal from "@/components/surfaces/GroupFilterModal";
import GroupCard from "@/components/surfaces/GroupCard";

export default defineComponent({
  name: "GroupIndex",
  components: { GroupCard, GroupFilterModal },
});
</script>
<style lang="scss">
@import "@/assets/styles/groups.modules.scss";

.options {
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  height: 60px;
  padding: 1.2rem !important;
}

.board {
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1300px;
}
</style>
