<template>
  <div class="m-main-wrap">
    <div class="glass member-select">
      <h3 class="title">{{ $t("search_result") }}</h3>
      <p class="mb-3">
        {{ $t("search_res_desc_1") }}<br />
        {{ $t("search_res_desc_2") }}
      </p>
      <div :class="{ 'member-list-area': showPaginator }">
        <MemberList
          v-for="(mem, index) in members"
          :key="index"
          :member="mem"
          :no-op="true"
          :active="isSelected(mem)"
          @click="activeMember(mem)"
        />
      </div>
      <div
        v-if="showPaginator"
        class="d-flex justify-content-between align-items-center paginator mt-3 mx-5"
      >
        <img src="@/assets/images/left@2x.png" alt="" @click="setPrev" />
        <span>{{ page }}</span>
        <img src="@/assets/images/right@2x.png" alt="" @click="setNext" />
      </div>
      <div class="button-wrapper mt-3">
        <Btn
          class="search"
          type="regular"
          color="legacy"
          size="fit"
          :name="$t('search_choose_btn')"
          @click="selectMember"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Member } from "@/types/Member";
import MemberList from "@/components/surfaces/MemberList.vue";

export default defineComponent({
  name: "MobileSelect",
  components: { MemberList },
  props: {
    keyword: {
      type: String,
      required: true,
    },
    members: {
      type: Array as PropType<Member[]>,
      required: true,
    },
  },
  emits: ["getGroupId"],
  data() {
    return {
      page: 1,
      member: undefined as Member | undefined,
      currentData: this.members,
      pageData: { next: [] as Member[], prev: [] as Member[] },
      hasNext: false,
      showPaginator: false,
    };
  },
  async mounted() {
    if (this.members.length >= 6) {
      this.showPaginator = true;
      await this.getNext();
    }
  },
  methods: {
    activeMember(member: Member) {
      this.member = member;
    },
    async getNext() {
      const res = await this.$api.searchMember(this.keyword, this.page + 1);
      const members = res.members;
      if (members.length) {
        this.pageData.next.push(...members);
        this.hasNext = true;
      } else {
        this.hasNext = false;
      }
    },
    setNext() {
      if (this.hasNext) {
        this.page += 1;
        this.pageData.prev.push(...this.currentData);
        this.currentData = [];
        this.currentData.push(...this.pageData.next);
        this.getNext();
      } else {
        this.$store.dispatch("showAlert", {
          message: this.$t("alert_last_page"),
          type: "warning",
        });
      }
    },
    setPrev() {
      if (this.page > 1) {
        this.page -= 1;
        this.pageData.next.push(...this.currentData);
        this.currentData = [];
        this.currentData.push(...this.pageData.prev);
      } else {
        this.$store.dispatch("showAlert", {
          message: this.$t("alert_first_page"),
          type: "warning",
        });
      }
    },
    selectMember() {
      if (this.member) {
        return this.$emit("getGroupId", this.member.group);
      }
    },
    isSelected(member: Member) {
      return this.member && this.member.id === member.id;
    },
  },
});
</script>
<style lang="scss" scoped>
.member-select {
  width: 75%;
  animation: floating 0.5s;

  .paginator {
    img {
      width: 27px;
      height: 27px;
    }

    span {
      display: inline-block;
      font-size: $font-size-md;
    }
  }

  .member-list-area {
    height: 468px;
  }
}

@keyframes floating {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
