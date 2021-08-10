<template>
  <div class="signin">
    <h1>{{ $t("F01001.hello") }}</h1>
    <el-form
      :model="signinForm"
      :rules="rules"
      ref="signinRef"
      label-width="15%"
    >
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="signinForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')" prop="password">
        <el-input v-model="signinForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="valid">{{
      $t("button.confirm")
    }}</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      signinForm: {
        username: "",
        password: "",
      },
      ElLoadingConfig: {
        target: ".signin",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("rules.required"),
          },
          { max: 24, trigger: "blur", message: this.$t("rules.max24") },
          {
            pattern: new RegExp(/^[a-zA-Z0-9]*$/),
            trigger: "blur",
            message: this.$t("rules.alphanumeric"),
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("rules.required"),
          },
          { max: 24, trigger: "blur", message: this.$t("rules.max24") },
        ],
      },
    };
  },
  methods: {
    valid() {
      this.$refs["signinRef"].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.signin();
      });
    },
    signin() {
      let superThis = this;
      let loadingInstance = superThis.$loading(superThis.ElLoadingConfig);
      let username = superThis.signinForm.username;
      axios
        .post("/signin/" + username, {
          username: username,
          password: superThis.signinForm.password,
        })
        .then(function (response) {
          if (response.data.isMatch) {
            superThis.$router.push("F02001");
            superThis.$store.commit("setActiveUri", "/F02001");
            superThis.$store.commit("setToken", response.data.token);
            superThis.$store.commit("startCountdown");
            superThis.$message.success(superThis.$t("signin.success"));
            return;
          }
          superThis.$message.error(superThis.$t("signin.failed"));
        })
        .catch(function (error) {
          console.log(error);
          superThis.$message.error(superThis.$t("message.error"));
        })
        .finally(function () {
          loadingInstance.close();
        });
    },
  },
};
</script>
