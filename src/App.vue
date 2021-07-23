<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="10%" style="background-color: rgb(238, 241, 246)">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item-group>
          <el-menu-item index="/">{{ $t("App.index") }}</el-menu-item>
          <el-menu-item index="/F02001">{{ $t("App.F02001") }}</el-menu-item>
          <el-menu-item index="/F03001">{{ $t("App.F03001") }}</el-menu-item>
          <el-menu-item index="/F01001">{{ $t("App.F01001") }}</el-menu-item>
          <el-menu-item index="/F01002">{{ $t("App.F01002") }}</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <el-select v-model="$i18n.locale">
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const activeIndex = ref("/");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      activeIndex,
      handleSelect,
    };
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
