<template>
  <div class="glass">
    <span class="box-label">검색 옵션</span>
    <section class="search-input">
      <span class="section-title">이름으로 검색</span>
      <div class="d-flex align-items-center">
        <span class="input">
          <input v-model="name" type="text" @keydown.enter="searchByName" />
        </span>
        <Btn
          type="regular"
          color="legacy"
          size="sm"
          name="검색"
          @click="searchByName"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilterOptionSelect",
  emits: ["searchName"],
  data() {
    return {
      name: "" as string,
    };
  },
  methods: {
    searchByName() {
      if (1 < this.name.length && this.name.length < 7) {
        this.$emit("searchName", this.name);
      } else {
        this.name = "";
        this.$store.dispatch("showAlert", {
          message: "2자 이상, 6자 이하로 입력해주세요",
          type: "danger",
        });
      }
    },
  },
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

.input {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 150px;
  height: 100%;
  background-color: $dark;
  margin-right: 8px;
  border-radius: 5px;
  border: $light solid 2px;

  input {
    @include clean();
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: $light;
    font-size: $font-size-md;
    text-align: center;
  }
}
</style>
