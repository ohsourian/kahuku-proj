<template>
  <main>
    <header>
      <div class="title">
        <h1>2022<br />전국<br />청년대회</h1>
        <p class="location">속초 오션투유 리조트</p>
        <p class="date">2022.09.23(금)~09.25(일)</p>
        <p class="welcome">
          예수그리스도 후기성도교회 <br />
          2022년 전국 청년대회에 <br />
          함께하게 된 여러분을 <br />
          환영합니다!
        </p>
      </div>
      <div class="button-wrapper"></div>
    </header>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
export default defineComponent({
  name: "Home",
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/main.module.scss";

.welcome {
  font-weight: normal !important;
  line-height: 1.3;
}

.button-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #8e2d95;
}
</style>
