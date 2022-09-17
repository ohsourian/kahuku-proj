<template>
  <Modal
    :is-open="visual"
    :title="`${member.group} 조 조장 설정`"
    @closeModal="onClose"
  >
    <section class="modal-wrap">
      <MemberList :member="member" :no-op="true" />
      <p>
        위 조원을 {{ member.group }} 조 조장으로 임명합니다. <br />
        계속 하시겠습니까?
      </p>
      <Btn type="regular" color="legacy" size="md" name="계속하기" />
    </section>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Member } from "@/types/Member";
import MemberList from "@/components/surfaces/MemberList.vue";

export default defineComponent({
  name: "GroupLeaderModal",
  components: { MemberList },
  props: {
    visual: {
      type: Boolean,
      required: true,
    },
    member: {
      type: Object as PropType<Member>,
      required: true,
    },
  },
  emits: ["close"],
  mounted() {
    console.log("modal mounted", this.member);
  },
  methods: {
    onClose() {
      return this.$emit("close");
    },
  },
});
</script>
<style lang="scss" scoped>
.modal-wrap {
  width: 450px;

  p {
    font-size: $font-size-md;
    text-align: center;
  }
}
</style>
