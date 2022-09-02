<template>
  <section class="main">
    <div class="contents">
      <span class="box-label">검색 옵션</span>
      <div class="glass options">
        <div>filter options</div>
        <div>applied</div>
      </div>
      <div class="board">
        <div class="group-layout">
          <span class="box-label">1조</span>
          <div class="glass">
            <div class="user-profile">
              <img
                class="p-img cc cc-48"
                src="https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
                alt="profile-image"
              />
              <div class="p-name">
                <p class="name">홍길동<span>형제</span></p>
                <p class="org">서울 스테이크</p>
              </div>
              <div class="p-setting">
                <button class="cc cc-36"></button>
                <button class="cc cc-36"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GroupFilterModal />
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";
import GroupFilterModal from "@/components/surfaces/GroupFilterModal";

export default defineComponent({
  name: "GroupIndex",
  components: { GroupFilterModal },
});
</script>
<style lang="scss">
@import "@/assets/styles/groups.modules.scss";

.options {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  height: 60px;
  padding: 1.2rem !important;
}

.board {
  margin-top: 3rem;
}

.group-layout {
  display: inline-block;
  width: 375px;
  margin-right: 1.5rem;

  .user-profile {
    display: flex;
    align-items: center;
    border-radius: $glass-border;
    padding: 6px;

    &:hover,
    &:active {
      background-color: rgba($lightgray, 0.25);
    }

    .p-img {
      margin-right: 16px;
    }

    .p-name {
      flex: 1;

      p {
        @include clean();
      }

      .name {
        font-weight: bold;
        font-size: 16pt;
        margin-bottom: 8px;

        span {
          font-weight: normal;
          font-size: 12pt;
          margin-left: 8px;
        }
      }

      .org {
        color: $gray;
      }
    }

    .p-setting {
      display: flex;
      width: 80px;
      justify-content: space-between;

      button {
        @include clean();
        cursor: pointer;
      }
    }
  }
}
</style>
