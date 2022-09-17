<template>
  <main>
    <div class="contents">
      <div class="fill fill-left" @click="updateMembers(groupIdx - 1)">
        <img src="@/assets/images/left@2x.png" alt="" />
        <p>
          <span style="--i: 1">P</span>
          <span style="--i: 2">R</span>
          <span style="--i: 3">E</span>
          <span style="--i: 4">V</span>
        </p>
      </div>
      <div class="center">
        <div class="glass remote">
          <span class="box-label">탐색 패널</span>
          <div class="remote-btns">
            <section class="search-input">
              <span class="section-title">조 번호로 검색</span>
              <div class="d-flex align-items-center">
                <span class="input">
                  <input
                    v-model="searchIdx"
                    type="number"
                    @keydown.enter="searchByGroup"
                  />
                </span>
                <Btn
                  type="regular"
                  color="legacy"
                  size="sm"
                  name="검색"
                  @click="searchByGroup"
                />
              </div>
            </section>
            <section class="button-area">
              <span class="section-title">바로가기</span>
              <Btn
                type="pill"
                color="secondary"
                size="md"
                name="circle-left"
                @click="updateMembers(groupIdx - 1)"
              />
              <Btn
                type="pill"
                color="secondary"
                size="md"
                name="circle-right"
                @click="updateMembers(groupIdx + 1)"
              />
              <Btn
                type="pill"
                color="success"
                size="md"
                name="share"
                @click="copyAddress"
              />
              <Btn
                type="pill"
                color="primary"
                size="md"
                name="home"
                @click="goHome"
              />
            </section>
          </div>
        </div>
        <div class="glass group-table" ref="member-result">
          <span class="box-label">조 편성 결과</span>
          <div class="group-title">
            <span class="group-number">{{ groupIdx }}</span>
          </div>
          <div class="member-list">
            <div class="column">
              <MemberList
                v-for="index in firstHalf"
                :key="index"
                :member="members[index - 1]"
                :no-op="true"
              />
            </div>
            <div class="column">
              <MemberList
                v-for="index in members.length - firstHalf"
                :key="index"
                :member="members[index - 1 + firstHalf]"
                :no-op="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="fill fill-right" @click="updateMembers(groupIdx + 1)">
        <p>
          <span style="--i: 1">N</span>
          <span style="--i: 2">E</span>
          <span style="--i: 3">X</span>
          <span style="--i: 4">T</span>
        </p>
        <img src="@/assets/images/right@2x.png" alt="" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MemberList from "@/components/surfaces/MemberList.vue";
import { Member } from "@/types/Member";

export default defineComponent({
  name: "PresentView",
  components: { MemberList },
  data() {
    return {
      groupIdx: 1,
      searchIdx: "",
      members: [] as Member[],
      openShare: false,
    };
  },
  computed: {
    firstHalf(): number {
      return Math.ceil(this.members.length / 2);
    },
    shareUrl(): string {
      return window.location.toString() + `?grp=${this.groupIdx}`;
    },
  },
  async mounted() {
    const grp = this.$route.query["grp"];
    if (!!grp && !isNaN(Number(grp))) {
      await this.updateMembers(Number(grp));
    }
    this.members = await this.$api.getGroupById(1);
    console.log(this.members.length, this.firstHalf);
  },
  watch: {
    openShare(newVal) {
      console.log({ newVal });
    },
  },
  methods: {
    async updateMembers(index: number) {
      if (0 < index && index < 37) {
        const newMem = await this.$api.getGroupById(index);
        // animate table
        const prevList = this.$refs["member-result"] as HTMLDivElement;
        const direction = this.groupIdx < index ? "move-left" : "move-right";
        prevList.classList.add(direction);
        await this.$sleep(500);
        prevList.classList.remove(direction);
        // renew data
        this.groupIdx = index;
        this.members = newMem;
        return true;
      }
      return this.showOverflowErr();
    },
    async searchByGroup() {
      if (!isNaN(Number(this.searchIdx))) {
        const index = Number(this.searchIdx);
        if (0 < index && index < 37) {
          const newMem = await this.$api.getGroupById(index);
          // animate table
          const prevList = this.$refs["member-result"] as HTMLDivElement;
          const direction = this.groupIdx < index ? "move-left" : "move-right";
          prevList.classList.add(direction);
          await this.$sleep(500);
          prevList.classList.remove(direction);
          // renew data
          this.groupIdx = index;
          this.members = newMem;
          return true;
        }
        this.searchIdx = "";
      }
      return this.showOverflowErr();
    },
    showOverflowErr() {
      this.$store.dispatch("showAlert", {
        message: "지정된 조 범위를 초과하는 요청입니다.",
        type: "danger",
      });
      return false;
    },
    copyAddress() {
      navigator.clipboard.writeText(this.shareUrl);
      this.$store.dispatch("showAlert", {
        message: "주소가 클립보드에 복사되었습니다.",
        type: "success",
      });
    },
    goHome() {
      return this.$router.push("/");
    },
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
  background-image: url("#{$img-path}/present-bg@1x.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.contents {
  display: flex;
  height: 100%;

  .fill {
    flex: 1;
    display: flex;
    cursor: pointer;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;

    &-left {
      img {
        margin-right: 30px;
      }
    }

    &-right {
      justify-content: flex-end;

      img {
        margin-left: 30px;
      }
    }

    &:hover {
      p span {
        display: inline-block;
        animation: textWave 1s infinite;
        animation-delay: calc(0.1s * var(--i));
      }
    }

    p {
      font-size: $font-size-xl;
      font-weight: bold;
      letter-spacing: 5px;
    }

    img {
      width: $font-size-db;
      height: $font-size-db;
    }
  }
}

.remote {
  margin-bottom: 13%;

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

    .button-area {
      button {
        margin-right: 18px;

        &:nth-last-child(1) {
          margin-right: 0 !important;
        }
      }
    }
  }
}

.group-table {
  position: relative;
  margin: 0 50px;
  z-index: 0;

  &:before {
    @include img(beach-glass);
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .group-title {
    width: 180px;
    height: 65px;
    font-size: $font-size-db;
    background-color: $gray-600;
    margin: 0 auto 30px auto;
    border-radius: 10rem;
    border: $gray-600 solid 4px;

    .group-number {
      position: relative;
      display: inline-block;
      width: 67%;
      height: 100%;
      text-align: center;
      line-height: 65px;
      border-radius: 10rem;
      background-image: linear-gradient(45deg, #202020, #1f1f1f);

      &:after {
        position: absolute;
        content: "조";
        top: 0;
        left: 135px;
      }
    }
  }

  .member-list {
    display: flex;

    .column {
      width: 320px;
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:after {
    position: absolute;
    content: "조";
    color: $light;
    top: 0;
    left: 125px;
    line-height: 22px;
    font-size: $font-size-sm;
  }
}

.move {
  &-left {
    animation-name: disappearLeft;
    animation-duration: 0.5s;
  }

  &-right {
    animation-name: disappearRight;
    animation-duration: 0.5s;
  }
}

@keyframes disappearLeft {
  to {
    transform: translateX(-100px);
    opacity: 0;
  }
}

@keyframes disappearRight {
  to {
    transform: translateX(100px);
    opacity: 0;
  }
}

@keyframes textWave {
  0%,
  40%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-20px);
  }
}
</style>
