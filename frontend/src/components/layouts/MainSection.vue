<template>
  <section
    class="main"
    :style="{ paddingRight: padding.right, paddingLeft: padding.left }"
  >
    <slot />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

const prefMargin = 60;
const sideMenuWidth = 200;
const safeArea = 1120;
export default defineComponent({
  name: "MainSection",
  computed: {
    menuToggle(): boolean {
      // 마진 90 px, 사이드메뉴 180 px, 스크린 클때는 push 필요 없음
      return this.$store.state.menuToggle;
    },
    padding(): { right: string; left: string } {
      const remain = window.innerWidth - prefMargin - sideMenuWidth - safeArea;
      console.log({ remain });
      if (this.menuToggle && remain < prefMargin * 2) {
        const space =
          remain > 0
            ? Math.floor(prefMargin - remain / 2)
            : Math.floor((remain * -1) / 2);
        return {
          right: `${space}px`,
          left: `${sideMenuWidth + space}px`,
        };
      }
      return {
        right: "0",
        left: "0",
      };
    },
  },
});
</script>
<style lang="scss" scoped></style>
