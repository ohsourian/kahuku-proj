<template>
  <div class="glass">
    <span class="box-label">검색 옵션</span>
    <div class="clear-all">모두 지우기</div>
    <div class="options">
      <div id="option-btn-group">
        <Btn
          class="filter-btn"
          type="pill"
          color="warning"
          size="md"
          name="group"
        />
        <Btn
          class="filter-btn"
          type="pill"
          color="orange"
          size="md"
          name="person"
        />
        <Btn
          class="filter-btn"
          type="pill"
          color="danger"
          size="md"
          name="arrow-right"
        />
        <Btn
          class="filter-btn"
          type="pill"
          color="purple"
          size="md"
          name="up-down"
        />
      </div>
      <div id="option-applied">
        <div class="option-pill">
          <img src="@/assets/images/group@2x.png" alt="option-img" />
          <span class="option-value">4조</span>
          <span class="option-clear">⨯</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterOptionSelectLegacy",
});
</script>
<style lang="scss" scoped>
.options {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: baseline;
}

.clear-all {
  float: right;
  font-size: 9pt;
  color: $primary;
  text-decoration: underline;
  font-weight: lighter;
  cursor: pointer;

  &:hover,
  &:active {
    color: $purple;
  }
}

#option-btn-group {
  min-width: 350px;
  margin-right: 30px;

  .filter-btn {
    margin-left: 12px;

    &:nth-child(1) {
      margin-left: 0;
    }
  }
}

#option-applied {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 3px 6px;
  background-color: #2c465f;
  width: 100%;
  height: 40px;
  background-color: rgba($dimblue, 0.3);
  border-radius: 10rem;

  .option-pill {
    display: flex;
    width: 100px;
    background-color: #2c465f;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-radius: 10rem;

    img {
      width: 36px;
    }

    span {
      display: inline-block;
      text-align: center;
    }

    .option-value {
      font-size: $font-size-sm;
      font-weight: lighter;
    }

    .option-clear {
      box-sizing: border-box;
      margin-bottom: 3px;
      font-size: $font-size-md;
    }
  }
}
</style>
