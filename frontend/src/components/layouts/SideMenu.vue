<template>
  <div class="glass menu-card">
    <div class="menu-category">
      <img src="@/assets/images/web@2x.png" alt="sitemap" />
      <span>사이트 맵</span>
    </div>
    <router-link class="menu-item" to="/"> Main Page</router-link>
    <router-link class="menu-item" to="/groups"> 조편성 확인</router-link>
    <div class="menu-category">
      <img src="@/assets/images/link@2x.png" alt="sitemap" />
      <span>외부링크</span>
    </div>
    <a class="menu-item" href="http://naver.com" target="_blank"> KYSA 공식 </a>
    <a class="menu-item" href="http://naver.com" target="_blank"> Instagram </a>
    <a class="menu-item" href="http://naver.com" target="_blank"> NewsRoom </a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenu",
});
</script>
<style lang="scss" scoped>
.menu-card {
  position: fixed;
  top: 90px;
  left: 56px;
  height: 80%;
  z-index: 5;

  .menu-category {
    display: flex;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: $font-xs;
    font-weight: lighter;

    &:nth-child(1) {
      margin-top: 18px;
    }

    img {
      height: $font-md;
      margin-right: 5px;
    }
  }

  .menu-item {
    position: relative;
    display: block;
    padding: 16px 12px;
    font-size: $font-sm;
    text-decoration: none;
    color: $gray;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: $glass-border;
      background-image: $hover-glow-border;
      background-size: 400%;
      animation: glowing 10s linear infinite;
      filter: blur(2px);
      opacity: 0;
      z-index: -1;
    }

    &:after {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: $glass-border;
      background-color: $darkbase;
      opacity: 0;
      z-index: -1;
    }

    &:hover,
    &:active {
      color: $white;
    }

    &:hover:after,
    &:active:after {
      opacity: 1;
    }

    &:hover:before,
    &:active:before {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
  }
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
