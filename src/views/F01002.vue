<template>
  <div class="signup">
    <h1>{{ $t("F01002.hello") }}</h1>
    <el-form
      :model="signupForm"
      :rules="rules"
      ref="signupRef"
      label-width="15%"
    >
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="signupForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')" prop="password">
        <el-input v-model="signupForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.dpassword')" prop="dpassword">
        <el-input v-model="signupForm.dpassword" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
        <el-input v-model="signupForm.email"></el-input>
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
      signupForm: {
        username: "",
        password: "",
        dpassword: "",
        email: "",
      },
      ElLoadingConfig: {
        target: ".signup",
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
        dpassword: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("rules.required"),
          },
          { max: 24, trigger: "blur", message: this.$t("rules.max24") },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("rules.required"),
          },
          { max: 120, trigger: "blur", message: this.$t("rules.max120") },
          {
            pattern: new RegExp(
              /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            ),
            trigger: "blur",
            message: this.$t("rules.email"),
          },
        ],
      },
    };
  },
  methods: {
    valid() {
      this.$refs["signupRef"].validate((valid) => {
        if (!valid) {
          return false;
        }

        let superThis = this;
        let password = superThis.signupForm.password;
        let dpassword = superThis.signupForm.dpassword;
        let isNotSame = password !== dpassword;
        if (isNotSame) {
          superThis.$message.error(superThis.$t("password.isNotSame"));
          return;
        }

        this.check();
      });
    },
    check() {
      let superThis = this;
      let username = superThis.signupForm.username;

      axios
        .get("/signup/" + username)
        .then(function (response) {
          if (typeof response.data.id !== "undefined") {
            superThis.$message.error(superThis.$t("username.exist"));
            return false;
          }
          return true;
        })
        .then(function (valid) {
          if (!valid) {
            return;
          }
          superThis.signup();
        })
        .catch(function (error) {
          console.log(error);
          superThis.$message.error(superThis.$t("message.error"));
        });
    },
    signup() {
      let superThis = this;
      let loadingInstance = superThis.$loading(superThis.ElLoadingConfig);

      axios
        .post("/signup", {
          username: superThis.signupForm.username,
          password: superThis.signupForm.password,
          email: superThis.signupForm.email,
          roles: [0],
        })
        .then(function () {
          superThis.$message.success(superThis.$t("message.success"));
          superThis.$router.push("F01001");
          superThis.$store.commit("setActiveUri", "/F01001");
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
