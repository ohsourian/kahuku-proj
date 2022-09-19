<template>
  <div class="m-main-wrap">
    <div class="language mb-3">
      <select v-model="langInput" class="form-select form-select-sm">
        <option value="ko">Korean</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="glass log-in pb-5">
      <h2 class="title">환영합니다!</h2>
      <p class="mb-5">
        검색 옵션에 따라 <br />
        소속된 조를 찾을 수 있습니다.
      </p>
      <div class="input-area">
        <label class="form-label">이름으로 찾기</label>
        <input
          v-model="nameInput"
          type="text"
          class="form-control form-control form-control-legacy"
          @focus="searchOpt = 'Name'"
        />
      </div>
      <div class="button-wrapper mt-5">
        <Btn
          class="search"
          type="regular"
          :color="searchOpt === 'Name' ? 'legacy' : 'light'"
          size="fit"
          name="이름 검색"
          @click="searchByName"
        />
      </div>
      <hr class="my-5" />
      <div class="input-area">
        <label class="form-label">조 번호로 찾기</label>
        <input
          v-model="groupIdInput"
          type="number"
          class="form-control form-control form-control-primary"
          @focus="searchOpt = 'GroupId'"
        />
      </div>
      <div class="button-wrapper mt-5">
        <Btn
          class="search"
          type="regular"
          :color="searchOpt === 'GroupId' ? 'primary' : 'light'"
          size="fit"
          name="조 검색"
          @click="searchByGroupId"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

type SearchOpt = "GroupId" | "Name";
export default defineComponent({
  name: "MobileMain",
  emits: ["getGroupId", "getName", "setLang"],
  data() {
    return {
      searchOpt: "Name" as SearchOpt,
      nameInput: "" as string,
      groupIdInput: "" as string,
      langInput: "ko" as "ko" | "en",
    };
  },
  methods: {
    async searchByName() {
      this.searchOpt = "Name";
      if (1 < this.nameInput.length) {
        return this.$emit("getName", this.nameInput);
      }
      this.$store.dispatch("showAlert", {
        message: "2자 이상, 6자 이하로 입력해주세요",
        type: "danger",
      });
    },
    async searchByGroupId() {
      this.searchOpt = "GroupId";
      const index = Number(this.groupIdInput);
      if (0 < index && index < 40) {
        return this.$emit("getGroupId", index);
      }
      this.$store.dispatch("showAlert", {
        message: "지정된 조 범위를 벗어났습니다.",
        type: "danger",
      });
    },
    async changeLang() {
      // use store
    },
  },
});
</script>
<style lang="scss" scoped>
.language {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 75%;

  .form-select {
    width: 30%;
    background-color: $gray-900;
    font-size: $font-size-xs;
    color: $light;

    &:focus {
      border-color: $light;
      box-shadow: none;
    }
  }
}

.log-in {
  width: 75%;
  animation: floating 0.5s;

  h2 {
    font-size: $font-size-xl;
    font-weight: normal !important;
    margin: 0 auto;
  }

  p {
    font-size: $font-size-base;
    font-weight: lighter;
    line-height: 1.2;
  }

  hr {
    border-color: $gray-500;
  }
}

.form-control {
  width: 90%;
  margin: 12px auto;
  background-color: $gray-900;
  color: $light;

  &-legacy:focus {
    background-color: $dark;
    color: $light;
    border-color: $blue;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset,
      0px 0px 8px rgba($blue-700, 0.5);
  }

  &-primary:focus {
    background-color: $dark;
    color: $light;
    border-color: $primary;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset,
      0px 0px 8px rgba(shade-color($primary, 40%), 0.5);
  }
}

.button-wrapper {
  width: 80%;
  margin: 0 auto;

  .search {
    font-size: $font-size-base;
  }
}

@keyframes floating {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
