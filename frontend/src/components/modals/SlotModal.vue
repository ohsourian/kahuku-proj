<template>
  <Modal :is-open="visual">
    <div class="modal-wrapper">
      <section v-if="modalState === 'ready'" class="fade-in">
        <img src="@/assets/images/lucky@2x.png" alt="lucky" />
        <h3>조편성 시드 확인</h3>
        <p>
          선택된 시드로 랜덤한 조 편성이 이루어집니다. <br />
          계속하려면 진행하기 버튼을 눌러주세요!
        </p>
      </section>
      <section v-else-if="modalState === 'progress'" class="fade-in">
        <img src="@/assets/images/drum@2x.png" alt="lucky" />
        <h3>조편성 현재 진행중</h3>
        <p>
          조편성이 현재 진행중입니다. <br />
          선택된 랜덤 시드와 여러 신청정보를 바탕으로 <br />
          조 편성이 이루어집니다.
        </p>
      </section>
      <section v-else-if="modalState === 'done'" class="fade-in">
        <img src="@/assets/images/party@2x.png" alt="lucky" />
        <h3>조편성 완료</h3>
        <p>
          조 편성이 완료되었습니다! <br />
          편성을 확인하시려면 확인하러 가기를 눌러주세요!
        </p>
      </section>
      <div class="seed-check">
        <div class="slot-roll" :class="{ 'ne-on': modalState === 'progress' }">
          <div class="slot-input txt-0">
            <div class="boxes" ref="b1">
              <div class="box">{{ slots[0] }}</div>
            </div>
          </div>
          <div class="slot-input txt-0">
            <div class="boxes" ref="b2">
              <div class="box">{{ slots[1] }}</div>
            </div>
          </div>
          <div class="slot-input txt-0">
            <div class="boxes" ref="b3">
              <div class="box">{{ slots[2] }}</div>
            </div>
          </div>
        </div>
      </div>
      <span v-if="!dbAlt" class="data-stat lock txt-success">
        DB alt state IN PROTECTION
      </span>
      <span v-else class="data-stat unlock txt-warning">
        WARNING! DB alt state unlocked!
      </span>
      <div v-if="modalState === 'ready'" class="button-wrapper">
        <Btn
          type="regular"
          color="primary"
          size="md"
          name="계속하기"
          @click="spin"
        />
        <Btn type="none" color="secondary" name="창 닫기" @click="closeModal" />
      </div>
      <div v-else-if="modalState === 'progress'" class="button-wrapper">
        <Btn
          type="regular"
          color="success"
          size="md"
          name="다음으로"
          @click="changeDone"
        />
        <Btn type="none" color="secondary" name="창 닫기" @click="closeModal" />
      </div>
      <div v-else-if="modalState === 'done'" class="button-wrapper">
        <Btn
          type="router"
          to="/present"
          color="primary"
          size="md"
          name="확인하러 가기"
        />
        <Btn type="none" color="secondary" name="창 닫기" @click="closeModal" />
      </div>
    </div>
  </Modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import imgPath from "@/assets/images/logo-indigo@2x.png";

type SlotModalType = "ready" | "progress" | "done";
const boxStyle = {
  display: "flex",
  width: "100%",
  height: "190px",
  alignItems: "center",
  justifyContent: "center",
};

export default defineComponent({
  name: "SlotModal",
  emits: ["closeSlot"],
  props: {
    visual: {
      type: Boolean,
      required: true,
    },
    slots: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      dbAlt: true,
      boxes: [] as HTMLDivElement[],
      boxData: [] as string[][],
      modalState: "ready" as SlotModalType,
    };
  },
  watch: {
    visual(newVal) {
      if (newVal) {
        this.modalState = "ready";
      }
    },
  },
  updated() {
    if (this.visual) {
      this.boxes.push(this.$refs.b1 as HTMLDivElement);
      this.boxes.push(this.$refs.b2 as HTMLDivElement);
      this.boxes.push(this.$refs.b3 as HTMLDivElement);
      //prepare dataset
      for (let i = 0; i < 3; i++) {
        this.boxData.push([...this.getRandNums(15), ""]);
      }
      this.boxData.forEach((arr, i) => {
        arr.forEach((val) => {
          const newBox = document.createElement("div");
          newBox.classList.add("box");
          newBox.textContent = val;
          (Object.keys(boxStyle) as (keyof typeof boxStyle)[]).forEach(
            (key: keyof typeof boxStyle) => {
              newBox.style[key] = boxStyle[key];
            }
          );
          this.boxes[i].appendChild(newBox);
        });
        const logoImg = document.createElement("img");
        logoImg.setAttribute("src", imgPath);
        logoImg.style.width = "50px";
        logoImg.style.height = "50px";
        this.boxes[i].lastChild!.appendChild(logoImg);
        this.boxes[i].style.top = `-${190 * arr.length}px`;
      });
    }
  },
  methods: {
    async spin() {
      this.modalState = "progress";
      for (const boxlist of this.boxes) {
        boxlist.classList.add("roll");
        await this.$sleep(300);
      }
    },
    async changeDone() {
      this.modalState = "done";
      for (const boxlist of this.boxes) {
        boxlist.classList.remove("roll");
        boxlist.classList.add("done");
        await this.$sleep(300);
      }
    },
    closeModal() {
      this.$emit("closeSlot");
    },
    getRandNums(count: number): string[] {
      const rand = [];
      for (let i = 0; i < count; i++) {
        rand.push((Math.floor(Math.random() * 98) + 1).toString());
      }
      return rand;
    },
  },
});
</script>
<style lang="scss" scoped>
.modal-wrapper {
  text-align: center;

  img {
    height: 72px;
    width: 72px;
  }

  h3 {
    font-size: $font-size-lg;
    margin: 30px 0;
  }

  p {
    box-sizing: border-box;
    font-size: $font-size-md;
    padding: 0 30px;
  }

  .seed-check {
    display: inline-block;
    width: 100%;
    height: auto;

    .slot-roll {
      box-sizing: border-box;
      border: 3px solid white;
      border-radius: 2rem;
      margin: 35px auto;
      width: 530px;
      height: 310px;
      display: flex;
      justify-content: center;
      align-items: center;

      .slot-input {
        position: relative;
        margin: 0 8px;
        border: 3px solid $gray;
        overflow: hidden;

        .boxes {
          position: absolute;
          flex-direction: column-reverse;
          box-sizing: border-box;
          display: flex;
          height: content-box;
          width: 100%;

          .box {
            display: flex;
            width: 100%;
            height: 190px;
            align-items: center;
            justify-content: center;
          }
        }

        .roll {
          animation-duration: 3s;
          animation-name: slotRoll;
          animation-iteration-count: infinite;
        }

        .done {
          top: 0 !important;
        }
      }
    }

    .ne-on {
      box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem $primary,
        0 0 0.8rem $primary, 0 0 2.8rem $primary, inset 0 0 1.3rem $primary;
      animation-duration: 2s;
      animation-name: neonSign;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
  }

  .data-stat {
    position: relative;
    display: inline-block;
    margin-top: 35px;
    font-size: $font-size-sm;
    font-weight: lighter;
  }

  .lock:before {
    @include psudo(15px, lock, right);
    position: absolute;
    top: 1px;
    left: -20px;
  }

  .unlock:before {
    @include psudo(15px, unlock, right);
    position: absolute;
    top: 1px;
    left: -20px;
  }

  .button-wrapper {
    margin-top: 18px;
  }
}

.fade-in {
  animation: fade 0.5s;
}

@keyframes slotRoll {
  70%,
  100% {
    top: 0;
  }
}

@keyframes neonSign {
  28% {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem $primary,
      0 0 0.8rem $primary, 0 0 2.8rem $primary, inset 0 0 1.3rem $primary;
  }
  66% {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem $warning,
      0 0 0.8rem $warning, 0 0 2.8rem $warning, inset 0 0 1.3rem $warning;
  }
  100% {
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem $danger,
      0 0 0.8rem $danger, 0 0 2.8rem $danger, inset 0 0 1.3rem $danger;
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
