<template>
  <main>
    <div class="m-nav">
      <Logo class="logo" kind="kysa-logo" :size="20" @click="goBackHome" />
    </div>
    <div class="m-alert">
      <transition name="alert">
        <div
          v-if="alertShow"
          :class="`alert alert-${alertType} alert-dismissible fade show`"
        >
          {{ alertMessage }}
          <button type="button" class="btn-close" @click="hideAlert">⨯</button>
        </div>
      </transition>
    </div>
    <MobileMain
      v-if="viewType === 'Main'"
      @getGroupId="getGroupId"
      @getName="searchName"
    />
    <MobileSelect
      v-else-if="viewType === 'Select'"
      :members="findList"
      :keyword="keyword"
      @getGroupId="getGroupId"
    />
    <MobileGroupList v-else-if="viewType === 'List'" :group-id="groupId" />
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MobileMain from "@/components/mobile/MobileMain.vue";
import MobileSelect from "@/components/mobile/MobileSelect.vue";
import MobileGroupList from "@/components/mobile/MobileGroupList.vue";
import Logo from "@/components/display/LogoComp.vue";
import { BootstrapScheme } from "@/types/Alert";
import { Member } from "@/types/Member";

type ViewType = "Main" | "Select" | "List";
export default defineComponent({
  name: "MobileView",
  components: { Logo, MobileGroupList, MobileSelect, MobileMain },
  data() {
    return {
      groupId: 0,
      viewType: "Main" as ViewType,
      findList: [] as Member[],
      keyword: "",
    };
  },
  computed: {
    alertShow(): boolean {
      return this.$store.state.alert.isShow;
    },
    alertMessage(): string {
      return this.$store.state.alert.message;
    },
    alertType(): BootstrapScheme {
      return this.$store.state.alert.type;
    },
  },
  watch: {
    async alertShow(newVal) {
      if (newVal) {
        await this.$sleep(3000);
        this.hideAlert();
      }
    },
  },
  created() {
    const grp = this.$route.query["grp"];
    if (!!grp && !isNaN(Number(grp))) {
      this.groupId = Number(grp);
      this.viewType = "List";
    }
  },
  methods: {
    async searchName(name: string) {
      this.keyword = name;
      const res = await this.$api.searchMember(name);
      const members = res.members;
      if (members.length > 1) {
        this.findList.push(...members);
        this.viewType = "Select";
      } else if (members.length === 1) {
        this.getGroupId(members[0].group);
      } else {
        this.$store.dispatch("showAlert", {
          message: "검색결과가 없습니다.",
          type: "info",
        });
      }
    },
    getGroupId(id: number) {
      this.$router.push(`/mobile?grp=${id}`);
    },
    hideAlert() {
      this.$store.dispatch("hideAlert");
    },
    goBackHome() {
      if (this.groupId) {
        this.$router.push("/mobile");
      } else {
        this.viewType = "Main";
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mobile.module.scss";

main {
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 72px);
  background-image: url("#{$img-path}/present-bg@1x.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.alert-enter-active {
  animation: fadeIn 0.3s;
}

.alert-leave-active {
  animation: fadeIn 0.3s reverse;
}
</style>
