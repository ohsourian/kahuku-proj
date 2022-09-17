<template>
  <div class="glass group-layout">
    <span class="box-label">{{ group.id }} 조</span>
    <MemberList
      v-for="(member, index) in group.members"
      :member="member"
      :key="`g${group.id}_${index}`"
    />
  </div>
</template>
<script lang="ts">
import MemberList from "@/components/surfaces/MemberList.vue";
import { PropType } from "vue";
import { Group } from "@/types/Member";
import GroupLeaderModal from "@/components/modals/GroupLeaderModal.vue";

export default {
  components: { MemberList },
  props: {
    group: { type: Object as PropType<Group>, required: true },
  },
};
</script>
<style lang="scss" scoped>
.group-layout {
  display: inline-block;
  width: 365px;
  margin: 0.7rem;
}
</style>
