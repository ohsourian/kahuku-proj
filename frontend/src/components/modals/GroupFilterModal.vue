<template>
  <Modal :is-open="visual" @closeModal="onClose">
    <section class="filter-wrapper container" v-if="type === 'share'">
      <div class="row">
        <div class="col-md-8">
          <label>주소 복사하기</label>
          <input class="mt-3 form-control" :value="url" disabled />
        </div>
        <div class="col-md-2 d-flex justify-content-end align-items-end">
          <Btn type="regular" color="legacy" size="md" name="복사하기" />
        </div>
      </div>
    </section>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

type FilterOption = "name-filter" | "group-filter" | "share";
export default defineComponent({
  name: "GroupFilterModal",
  props: {
    visual: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String as PropType<FilterOption>,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  methods: {
    onClose() {
      return this.$emit("close");
    },
  },
});
</script>
<style lang="scss" scoped>
.filter-wrapper {
  width: 550px;

  input {
    width: 100%;
  }
}
</style>
