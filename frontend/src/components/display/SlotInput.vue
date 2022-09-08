<template>
  <input
    class="slot-input"
    v-model="value"
    @keydown="bindNumber"
    @keyup="updateValue"
    ref="s-in"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SlotInput",
  emits: ["update"],
  props: {
    init: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: this.init,
    };
  },
  computed: {
    valueClean(): string {
      if (isNaN(Number(this.value))) {
        return "";
      }
      return this.value;
    },
  },
  watch: {
    init(newVal) {
      this.value = newVal;
    },
  },
  methods: {
    bindNumber(event: any) {
      const charCode = event.keyCode;
      const val = event.target.value;
      if (charCode === 229) {
        event.preventDefault();
      }
      if (charCode === 8 || (48 < charCode && charCode < 58)) {
        if (this.value.length < 2 || charCode === 8) {
          return true;
        }
      }
      event.preventDefault();
    },
    updateValue() {
      const inputBox = this.$refs["s-in"] as HTMLInputElement;
      if (!isNaN(Number(inputBox.value))) {
        this.value = inputBox.value;
      }
      this.$emit("update", this.valueClean);
    },
  },
});
</script>
