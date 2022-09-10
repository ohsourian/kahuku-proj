<template>
  <div class="glass mac-box">
    <h2>조 배정 시작하기</h2>
    <div class="slot-outline">
      <SlotInput
        class="slot-in"
        :init="slots[0]"
        @update="updateSlot($event, 0)"
      />
      <SlotInput
        class="slot-in"
        :init="slots[1]"
        @update="updateSlot($event, 1)"
      />
      <SlotInput
        class="slot-in"
        :init="slots[2]"
        @update="updateSlot($event, 2)"
      />
    </div>
    <div class="button-wrapper">
      <Btn
        class="slot-action"
        type="regular"
        color="primary"
        size="fit"
        name="시작하기"
        @click="beginSlot"
      />
      <Btn
        class="slot-action"
        type="regular"
        color="secondary"
        size="fit"
        name="조 확인하기"
      />
      <Btn
        class="slot-action"
        type="none"
        color="primary"
        name="입력 초기화"
        @click="resetInputs"
      />
    </div>
  </div>
  <SlotModal
    :visual="isSlotModalOn"
    :slots="slots"
    @closeSlot="isSlotModalOn = false"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SlotInput from "@/components/display/SlotInput.vue";
import SlotModal from "@/components/modals/SlotModal.vue";

export default defineComponent({
  name: "SlotSelect",
  components: { SlotModal, SlotInput },
  data() {
    return {
      slots: Array(3).fill(""),
      isSlotModalOn: false,
    };
  },
  methods: {
    resetInputs() {
      this.slots = Array(3).fill("");
    },
    updateSlot(value: string, index: number) {
      this.slots[index] = value;
    },
    beginSlot() {
      console.log(this.$store.state.alert.isShow);
      if (
        this.slots.length === 3 &&
        this.slots.every((x) => x.length && !isNaN(Number(x)))
      ) {
        this.isSlotModalOn = true;
        return true;
      }
      this.$store.dispatch("showAlert", {
        message: "입력정보가 올바르지 않습니다.",
        type: "danger",
      });
      return false;
    },
  },
});
</script>
<style lang="scss" scoped>
.mac-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  h2 {
    @include textGradient($silver-text);
    display: inline-block;
    font-size: 45px;
    margin-bottom: 0;
  }

  .slot-outline {
    box-sizing: border-box;
    border: 3px solid white;
    border-radius: 2rem;
    margin: 70px 0;
    width: 530px;
    height: 310px;
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem $primary,
      0 0 0.8rem $primary, 0 0 2.8rem $primary, inset 0 0 1.3rem $primary;

    display: flex;
    justify-content: center;
    align-items: center;

    .slot-in {
      margin: 0 8px;
    }
  }

  .button-wrapper {
    margin: 0 auto;
    width: 270px;
  }

  .slot-action {
    margin-bottom: 13px;
  }
}
</style>
