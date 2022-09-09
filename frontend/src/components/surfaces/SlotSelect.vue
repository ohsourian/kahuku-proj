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
    <Btn
      class="slot-action"
      type="regular"
      color="primary-fill"
      size="md"
      name="시작하기"
      @click="beginSlot"
    />
    <Btn
      class="slot-action"
      type="regular"
      color="secondary-fill"
      size="md"
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
      console.log(
        this.slots.length === 3,
        this.slots.every((x) => x.length && !isNaN(Number(x)))
      );
      if (
        this.slots.length === 3 &&
        this.slots.every((x) => x.length && !isNaN(Number(x)))
      ) {
        this.isSlotModalOn = true;
        return true;
      }
      // run toast
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
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
      0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;

    display: flex;
    justify-content: center;
    align-items: center;

    .slot-in {
      margin: 0 8px;
    }
  }

  .slot-action {
    margin-bottom: 13px;
  }
}
</style>
