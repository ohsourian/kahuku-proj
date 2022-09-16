<template>
  <main>
    <section class="main">
      <div class="contents">
        <FilterOptionSelect />
        <div class="board" ref="board">
          <GroupCard
            v-for="(group, index) in groups"
            :group="group"
            :key="index"
          />
          <div v-if="onPageLoad">LOADNING....</div>
        </div>
        <GroupFilterModal />
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import FilterOptionSelect from "@/components/surfaces/FilterOptionSelect.vue";
import GroupCard from "@/components/surfaces/GroupCard.vue";
import GroupFilterModal from "@/components/modals/GroupFilterModal.vue";
import { defineComponent } from "vue";
import { Group } from "@/types/Member";

export default defineComponent({
  name: "GroupIndex",
  components: { GroupFilterModal, FilterOptionSelect, GroupCard },
  data() {
    return {
      params: {} as {
        group?: string[];
        name?: string;
      },
      groups: [] as Group[],
      onPageLoad: false,
      hasNextPage: true,
      page: 1,
    };
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.onPageLoad = true;
    await this.fetchGroup();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async fetchGroup(delay = 0) {
      const page = await this.$api.fetchGroup({
        page: this.page,
        ...this.params,
      });
      if (delay) {
        await this.$sleep(delay);
      }
      this.onPageLoad = false;
      if (page.length) {
        this.groups.push(...page);
        this.page++;
      } else {
        this.hasNextPage = false;
      }
    },
    async handleScroll() {
      const boardHeight = (
        this.$refs.board as HTMLDivElement
      ).getBoundingClientRect().bottom;
      if (boardHeight < window.innerHeight) {
        if (this.hasNextPage && !this.onPageLoad) {
          this.onPageLoad = true;
          await this.fetchGroup(800);
        }
      }
    },
  },
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
