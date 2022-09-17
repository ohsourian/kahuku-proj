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
            @setLeader="openSetLeader"
          />
        </div>
        <div v-if="onPageLoad" class="py-3 d-flex justify-content-center">
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <!--        <GroupFilterModal />-->
        <GroupLeaderModal
          v-if="groupLeaderModal.isOpen"
          :member="groupLeaderModal.member"
          :visual="groupLeaderModal.isOpen"
          @close="closeSetLeader"
        />
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import GroupCard from "@/components/surfaces/GroupCard.vue";
import { defineComponent } from "vue";
import { Group, Member } from "@/types/Member";
import GroupLeaderModal from "@/components/modals/GroupLeaderModal.vue";
import FilterOptionSelect from "@/components/surfaces/FilterOptionSelect.vue";
import GroupFilterModal from "@/components/modals/GroupFilterModal.vue";

export default defineComponent({
  name: "GroupIndex",
  components: { GroupLeaderModal, GroupCard },
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
      groupLeaderModal: {
        isOpen: false,
        member: {} as Member,
      },
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
    openSetLeader(member: Member) {
      this.groupLeaderModal = {
        isOpen: true,
        member,
      };
    },
    async closeSetLeader() {
      this.groupLeaderModal.isOpen = false;
      this.$sleep(1500);
      window.location.reload();
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
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1300px;
}
</style>
