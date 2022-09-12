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
      <div class="button-wrapper">
        <Btn
          class="shortcut"
          type="regular"
          color="legacy"
          size="lg"
          after="down"
          name="조편성 바로가기"
        />
      </div>
    </header>
    <div class="contents">
      <div class="contents-header">
        <img src="@/assets/images/chip@2x.png" alt="chip-ams" />
        <small class="sequence">
          <span class="emp">A</span>UTOMATED <span class="emp">G</span>ROUP
          <span class="emp">G</span>ENERATOR
        </small>
        <h3>
          <span class="sub">여러분과 3일간 함께 지낼 조원을</span><br />
          <span class="main">여기서 딱 정해드립니다.</span>
        </h3>
        <p>
          청년대회 조 편성이 여기서 즉석으로 이루어 집니다. <br />
          신청 과정에서 여러분이 작성해주신 성별 및 나이를 포함한 여러 정보를
          반영하여, 자동 그룹 생성 알고리즘은 현장에서 랜덤 시드를 받아 그
          자리에서 즉시 난수화 하여 16명씩 한 조로 배정합니다.
        </p>
        <ul>
          <li>
            <img src="@/assets/images/automated@2x.png" alt="auto" /><br />
            <span>프로세스 자동화</span>
          </li>
          <li>
            <img src="@/assets/images/lucky@2x.png" alt="luck" /><br />
            <span>시드 랜덤화 알고리즘</span>
          </li>
          <li>
            <img src="@/assets/images/globe@2x.png" alt="globe" /><br />
            <span>높은 접근성</span>
          </li>
        </ul>
      </div>
      <div class="space">
        <SlotSelect />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlotSelect from "@/components/surfaces/SlotSelect.vue"; // @ is an alias to /src
export default defineComponent({
  name: "Home",
  components: { SlotSelect },
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
  height: 130px;

  .shortcut {
    margin-left: 58%;
  }
}

.space {
  margin: 75px 0;
}
</style>
