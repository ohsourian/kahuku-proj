<template>
  <div class="glass group-layout">
    <span class="box-label">{{ group.id }} 조</span>
    <MemberList
      v-for="(member, index) in group.members"
      :member="member"
      :key="`g${group.id}_${index}`"
      @clickLeader="onSetLeader(member)"
    />
  </div>
</template>
<script lang="ts">
import MemberList from "@/components/surfaces/MemberList.vue";
import { defineComponent, PropType } from "vue";
import { Group, Member } from "@/types/Member";

export default defineComponent({
  components: { MemberList },
  props: {
    group: { type: Object as PropType<Group>, required: true },
  },
  emits: ["setLeader"],
  methods: {
    onSetLeader(member: Member) {
      this.$emit("setLeader", member);
    },
  },
});
</script>
<style lang="scss" scoped>
.group-layout {
  display: inline-block;
  width: 365px;
  margin: 0.7rem;
}
</style>
