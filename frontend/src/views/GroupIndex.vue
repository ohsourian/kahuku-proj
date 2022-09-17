<template>
  <main>
    <section class="main">
      <div class="contents">
        <!--        <FilterOptionSelect />-->
        <div class="board" ref="board">
          <GroupCard
            v-for="(group, index) in groups"
            :group="group"
            :key="index"
          />
          <div v-if="onPageLoad">LOADNING....</div>
        </div>
        <!--        <GroupFilterModal />-->
        <!--        <GroupLeaderModal v-if="groups.length" :member="first" :visual="true" />-->
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import GroupCard from "@/components/surfaces/GroupCard.vue";
import { defineComponent } from "vue";
import { Group, Member } from "@/types/Member";
import FilterOptionSelect from "@/components/surfaces/FilterOptionSelect.vue";
import GroupFilterModal from "@/components/modals/GroupFilterModal.vue";
import GroupLeaderModal from "@/components/modals/GroupLeaderModal.vue";

export default defineComponent({
  name: "GroupIndex",
  components: { GroupCard },
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
    console.log(this.first);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    first(): Member {
      return this.groups[0].members[0];
    },
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

main {
  flex: 1;
  padding-left: 60px;
  padding-right: 60px;
  background-image: url("#{$img-path}/bg-group-index@1x.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.board {
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1300px;
}
</style>
