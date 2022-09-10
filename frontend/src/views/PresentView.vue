<template>
  <main>
    <div class="contents">
      <div class="fill fill-left"></div>
      <div class="center">
        <div class="glass remote">
          <span class="box-label">탐색 패널</span>
          <div class="remote-btns">
            <section class="search-input">
              <span class="section-title">조 번호로 검색</span>
              <div class="d-flex align-items-center">
                <span class="input">
                  <input type="text" />
                </span>
                <Btn type="regular" color="legacy" size="sm" name="검색" />
              </div>
            </section>
            <section class="button-area">
              <span class="section-title">바로가기</span>
              <Btn type="regular" color="primary" size="sm" name="이전 조" />
              <Btn type="regular" color="warning" size="sm" name="다음 조" />
              <Btn type="regular" color="secondary" size="sm" name="메인으로" />
            </section>
          </div>
        </div>
        <div class="glass group-table">
          <span class="box-label">1조</span>
          <div class="member-list">
            <div class="column">
              <MemberList v-for="index in 8" :key="index" />
            </div>
            <div class="column">
              <MemberList v-for="index in 8" :key="index" />
            </div>
          </div>
        </div>
      </div>
      <div class="fill fill-right"></div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MemberList from "@/components/surfaces/MemberList.vue";

export default defineComponent({
  name: "PresentView",
  components: { MemberList },
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
main {
  width: 100%;
  min-height: 800px;
  height: calc(100vh - 148px);
  padding-top: 52px;
  overflow: auto;
}

.contents {
  display: flex;
  height: 100%;

  .fill {
    flex: 1;

    &-left {
      background-color: #f6c744;
    }

    &-right {
      background-color: #8e2d95;
    }
  }
}

.remote {
  margin-bottom: 23%;

  .remote-btns {
    display: flex;
    justify-content: space-between;

    section {
      position: relative;
      padding-top: 20px;
      margin-top: 10px;

      .section-title {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        font-size: $font-size-sm;
        font-weight: lighter;
      }
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

  &:after {
    position: absolute;
    content: "조";
    color: $light;
    top: 9px;
    left: 125px;
    font-size: $font-size-sm;
  }
}

.group-table {
  margin: 0 50px;

  .member-list {
    display: flex;

    .column {
      width: 320px;
    }
  }
}
</style>
