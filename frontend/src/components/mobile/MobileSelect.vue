<template>
  <div class="m-main-wrap">
    <div class="glass member-select">
      <h3 class="title">검색 결과</h3>
      <p class="mb-3">
        비슷한 이름의 검색결과를 찾았습니다.<br />
        조를 확인할 회원을 선택해주세요.
      </p>
      <div :class="{ 'member-list-area': showPaginator }">
        <MemberList
          v-for="(member, index) in members"
          :key="index"
          :member="member"
          :no-op="true"
          @click="activeMember"
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
          name="회원선택"
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
          message: "마지막 페이지입니다.",
          type: "info",
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
          message: "첫 페이지입니다.",
          type: "info",
        });
      }
    },
    selectMember() {
      if (this.member) {
        return this.$emit("getGroupId", this.member.group);
      }
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
