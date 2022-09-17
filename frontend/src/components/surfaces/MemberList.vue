<template>
  <div class="user-profile">
    <div class="p-img cc cc-48" :style="{ backgroundColor: member.color }">
      <img :src="profileImg" alt="profile-image" />
    </div>
    <div class="p-name">
      <p class="name">
        {{ member.name }}<span>{{ broSis }}</span>
      </p>
      <p class="org">{{ parseStake }}</p>
    </div>
    <div v-if="!noOp" class="p-setting">
      <!--      <Btn type="round" color="info-wb" size="md" name="brush" />-->
      <Btn type="round" color="warning-wb" size="md" name="crown" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Member } from "@/types/Member";

export default defineComponent({
  name: "MemberList",
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true,
    },
    noOp: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    broSis(): string {
      return this.member.gender ? "자매" : "형제";
    },
    parseStake(): string {
      return this.member.belong.split("_").shift() ?? this.member.belong;
    },
    profileImg(): string {
      return this.member.gender
        ? require("@/assets/images/icon-sis@2x.png")
        : require("@/assets/images/icon-bro@2x.png");
    },
  },
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

    img {
      width: 100%;
      height: 100%;
    }
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
