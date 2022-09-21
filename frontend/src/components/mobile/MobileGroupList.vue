<template>
  <div class="m-main-wrap">
    <div v-if="onPageLoad" class="temp-reset">
      <Btn
        class="mr-3"
        type="regular"
        color="light"
        size="sm"
        :name="$t('list_reset')"
        @click="goBackHome"
      />
      <Btn type="share" color="legacy" size="sm" :name="$t('list_reset')" />
    </div>
    <div v-if="!onPageLoad" class="py-3 d-flex justify-content-center">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="glass group-list px-3 pt-3 pb-5">
      <h2 class="title">
        {{ lang === "en" ? `Group ${groupId}` : `${groupId} 조` }}
      </h2>
      <MemberList
        v-for="(member, index) in members"
        :key="index"
        :member="member"
        :no-op="true"
      />
    </div>
    <!--<div class="bottom-nav">-->
    <!--  <div class="bottom-nav-wrap">-->
    <!--    <div class="fab cc cc-72">+</div>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Member } from "@/types/Member";
import MemberList from "@/components/surfaces/MemberList.vue";

export default defineComponent({
  name: "MobileGroupList",
  components: { MemberList },
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      members: [] as Member[],
      onPageLoad: false,
    };
  },
  computed: {
    lang(): string {
      return this.$store.getters.getLang;
    },
  },
  async mounted() {
    this.members = await this.$api.getGroupById(this.groupId);
    this.onPageLoad = true;
  },
  methods: {
    goBackHome() {
      this.$router.push("/mobile");
    },
  },
});
</script>
<style lang="scss" scoped>
.temp-reset {
  position: fixed;
  display: flex;
  top: 60px;
  left: 0;
  width: 97%;
  justify-content: flex-end;

  *:nth-child(1) {
    margin-right: 15px;
  }
}

.group-list {
  width: 100%;
  animation: floating 0.5s;
  box-sizing: border-box;
}

.bottom-nav {
  position: fixed;
  top: calc(100vh - 120px);
  left: 0;
  background-color: #8e2d95;
  width: 100%;
  height: 120px;

  .bottom-nav-wrap {
    position: relative;
    background-color: #0d6efd;
    width: 100%;
    height: 100%;

    .fab {
      position: absolute;
      background-color: #1f1f1f;
      top: 0;
      left: calc(100vw - 72px);
    }
  }
}

@keyframes floating {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
