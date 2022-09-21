<template>
  <div class="m-main-wrap">
    <div class="language mb-3">
      <select
        v-model="langInput"
        class="form-select form-select-sm"
        @change="changeLang"
      >
        <option value="ko">Korean</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="glass log-in pb-5">
      <h2 class="title">{{ $t("welcome") }}</h2>
      <p class="mb-5">
        {{ $t("welcome_desc_1") }} <br />
        {{ $t("welcome_desc_2") }}
      </p>
      <div class="input-area">
        <label class="form-label">{{ $t("search_name_label") }}</label>
        <input
          v-model="nameInput"
          type="text"
          class="form-control form-control form-control-legacy"
          @focus="searchOpt = 'Name'"
        />
      </div>
      <div class="button-wrapper mt-5">
        <Btn
          class="search"
          type="regular"
          :color="searchOpt === 'Name' ? 'legacy' : 'light'"
          size="fit"
          :name="$t('search_name_btn')"
          @click="searchByName"
        />
      </div>
      <hr class="my-5" />
      <div class="input-area">
        <label class="form-label">{{ $t("search_group_label") }}</label>
        <input
          v-model="groupIdInput"
          type="number"
          class="form-control form-control form-control-primary"
          @focus="searchOpt = 'GroupId'"
        />
      </div>
      <div class="button-wrapper mt-5">
        <Btn
          class="search"
          type="regular"
          :color="searchOpt === 'GroupId' ? 'primary' : 'light'"
          size="fit"
          :name="$t('search_group_btn')"
          @click="searchByGroupId"
        />
      </div>
    </div>
    <div class="d-flex align-items-center mt-3 follow-us">
      <a
        href="https://www.facebook.com/2022kysa"
        target="_blank"
        class="fb"
      ></a>
      <a
        href="https://www.instagram.com/2022kysa"
        target="_blank"
        class="ins"
      ></a>
      <a href="https://discord.gg/AbfHWfjWut" target="_blank" class="dis"></a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Lang } from "@/types/Common";

type SearchOpt = "GroupId" | "Name";
export default defineComponent({
  name: "MobileMain",
  emits: ["getGroupId", "getName", "setLang"],
  data() {
    return {
      searchOpt: "Name" as SearchOpt,
      nameInput: "" as string,
      groupIdInput: "" as string,
      langInput: "ko" as Lang,
    };
  },
  computed: {
    lang(): Lang {
      return this.$store.getters.getLang;
    },
  },
  watch: {
    lang(newVal) {
      console.log(newVal);
    },
  },
  mounted() {
    this.langInput = this.lang;
  },
  methods: {
    async searchByName() {
      this.searchOpt = "Name";
      if (1 < this.nameInput.length) {
        return this.$emit("getName", this.nameInput);
      }
      this.$store.dispatch("showAlert", {
        message: this.$t("alert_search_length"),
        type: "danger",
      });
    },
    async searchByGroupId() {
      this.searchOpt = "GroupId";
      const index = Number(this.groupIdInput);
      if (0 < index && index < 40) {
        return this.$emit("getGroupId", index);
      }
      this.$store.dispatch("showAlert", {
        message: this.$t("alert_search_group_out_idx"),
        type: "danger",
      });
    },
    async changeLang() {
      this.$router.replace(`/mobile?lang=${this.langInput}`);
    },
  },
});
</script>
<style lang="scss" scoped>
.language {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 75%;

  .form-select {
    width: 30%;
    background-color: $gray-900;
    font-size: $font-size-xs;
    color: $light;

    &:focus {
      border-color: $light;
      box-shadow: none;
    }
  }
}

.log-in {
  width: 75%;
  animation: floating 0.5s;

  h2 {
    font-size: $font-size-xl;
    font-weight: normal !important;
    margin: 0 auto;
  }

  p {
    font-size: $font-size-base;
    font-weight: lighter;
    line-height: 1.2;
  }

  hr {
    border-color: $gray-500;
  }
}

.form-control {
  width: 90%;
  margin: 12px auto;
  background-color: $gray-900;
  color: $light;

  &-legacy:focus {
    background-color: $dark;
    color: $light;
    border-color: $blue;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset,
      0px 0px 8px rgba($blue-700, 0.5);
  }

  &-primary:focus {
    background-color: $dark;
    color: $light;
    border-color: $primary;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset,
      0px 0px 8px rgba(shade-color($primary, 40%), 0.5);
  }
}

.button-wrapper {
  width: 80%;
  margin: 0 auto;

  .search {
    font-size: $font-size-base;
  }
}

.follow-us {
  a {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 30px;

    &:active {
      animation: shrink 0.1s ease-out;
    }
  }

  .dis {
    @include img(discord);
  }

  .ins {
    @include img(instagram);
  }

  .fb {
    @include img(facebook);
  }
}

@keyframes floating {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

@keyframes shrink {
  to {
    transform: scale(0.7);
  }
}
</style>
