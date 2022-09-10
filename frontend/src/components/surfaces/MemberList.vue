<template>
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
      <Btn type="round" color="info-wb" size="md" name="brush" />
      <Btn type="round" color="warning-wb" size="md" name="crown" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MemberList",
});
</script>
<style lang="scss" scoped>
.user-profile {
  display: flex;
  align-items: center;
  border-radius: $glass-border;
  padding: 10px;
  margin-bottom: 10px;

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
    justify-content: flex-end;

    button {
      margin-right: 8px;

      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
