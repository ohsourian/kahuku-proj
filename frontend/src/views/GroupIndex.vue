<template>
  <main>
    <section class="main">
      <div class="contents">
        <FilterOptionSelect />
        <div class="board">
          <GroupCard v-for="index in 6" :key="index" />
        </div>
        <GroupFilterModal />
      </div>
    </section>
  </main>
</template>
<script>
import { defineComponent } from "vue";
import GroupFilterModal from "@/components/surfaces/GroupFilterModal";
import GroupCard from "@/components/surfaces/GroupCard";
import FilterOptionSelect from "@/components/surfaces/FilterOptionSelect";

export default defineComponent({
  name: "GroupIndex",
  components: { FilterOptionSelect, GroupCard, GroupFilterModal },
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/groups.modules.scss";

.board {
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1300px;
}
</style>
