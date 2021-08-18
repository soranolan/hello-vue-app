<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="11%" style="background-color: rgb(238, 241, 246)">
      <el-menu
        :default-active="this.$store.state.activeUri"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item-group>
          <el-menu-item v-if="!$route.params.token" index="/">{{
            $t("App.index")
          }}</el-menu-item>
          <el-menu-item v-if="!$route.params.token" index="/F02001">{{
            $t("App.F02001")
          }}</el-menu-item>
          <el-menu-item v-if="!$route.params.token" index="/F03001">{{
            $t("App.F03001")
          }}</el-menu-item>
          <el-menu-item
            v-if="!$store.state.token && !$route.params.token"
            index="/F01001"
            >{{ $t("App.F01001") }}</el-menu-item
          >
          <el-menu-item
            v-if="!$store.state.token && !$route.params.token"
            index="/F01002"
            >{{ $t("App.F01002") }}</el-menu-item
          >
          <el-menu-item
            v-if="$store.state.token && !$route.params.token"
            @click="signout"
            >{{ $t("App.F01003") }}</el-menu-item
          >
          <el-menu-item v-if="$route.params.token">{{
            $t("App.F01004")
          }}</el-menu-item>
          <el-menu-item
            v-if="!$store.state.token && !$route.params.token"
            index="/F01005"
            >{{ $t("App.F01005") }}</el-menu-item
          >
          <el-menu-item v-if="$store.state.token && !$route.params.token">{{
            formatedCountdown
          }}</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-select v-model="$i18n.locale" @change="setLanguage($i18n.locale)">
            <el-option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
            >
              {{ locale }}
            </el-option>
          </el-select>
        </div>
      </el-header>
      <el-main><router-view /></el-main>
      <el-footer>{{ $t("App.footer") }} &copy; 2021</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
  computed: {
    formatedCountdown() {
      let countdown = this.$store.state.countdown;
      if (countdown === 0) {
        this.forceSignout();
      }
      return moment.duration(countdown, "seconds").format("m:ss");
    },
  },
  methods: {
    setLanguage(locale) {
      localStorage.setItem("language", locale);
    },
    signout() {
      let superThis = this;
      superThis
        .$confirm(superThis.$t("signout.hello"), {
          confirmButtonText: superThis.$t("button.confirm"),
          cancelButtonText: superThis.$t("button.cancel"),
          type: "warning",
        })
        .then(() => {
          superThis.forceSignout();
          superThis.$message.success(superThis.$t("signout.success"));
        })
        .catch(() => {
          superThis.$message.info(superThis.$t("signout.canceled"));
        });
    },
    forceSignout() {
      this.$router.push("/F01001");
      this.$store.commit("setActiveUri", "/F01001");
      this.$store.commit("setToken", "");
      this.$store.commit("stopCountdown");
      this.$store.commit("resetCountdown");
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
