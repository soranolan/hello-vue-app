<template>
  <div class="signup">
    <h1>{{ $t("F01002.hello") }}</h1>
    <el-form
      :model="signupForm"
      :rules="rules"
      ref="signupRef"
      label-width="15%"
    >
      <el-form-item :label="$t('user.account')" prop="account">
        <el-input v-model="signupForm.account"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')" prop="password">
        <el-input v-model="signupForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.dpassword')" prop="dpassword">
        <el-input v-model="signupForm.dpassword" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="valid">{{
      $t("button.confirm")
    }}</el-button>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";

export default {
  data() {
    return {
      signupForm: {
        account: "",
        password: "",
        dpassword: "",
      },
      ElLoadingConfig: {
        target: ".signup",
      },
      rules: {
        account: [
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
        let password = this.signupForm.password;
        let dpassword = this.signupForm.dpassword;
        let isNotSame = password !== dpassword;
        if (isNotSame) {
          ElMessage.error(superThis.$t("message.isNotSame"));
          return;
        }

        this.encrypt(password);
      });
    },
    encrypt(password) {
      let superThis = this;

      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          console.log(err);
          console.log(hash);
          ElMessage.error(superThis.$t("message.error"));
          return;
        }
        superThis.check(hash);
      });
    },
    check(hash) {
      let superThis = this;
      let account = this.signupForm.account;
      let loadingInstance = ElLoading.service(this.ElLoadingConfig);

      axios
        .get("/signup/check/" + account)
        .then(function (response) {
          if (typeof response.data.id !== "undefined") {
            ElMessage.error(superThis.$t("message.accountExist"));
            return;
          }
          superThis.signup(account, hash);
        })
        .catch(function (error) {
          console.log(error);
          ElMessage.error(superThis.$t("message.error"));
        })
        .finally(function () {
          loadingInstance.close();
        });
    },
    signup(account, hash) {
      let superThis = this;

      axios
        .post("/signup", {
          account: account,
          passwordHash: hash,
        })
        .then(function () {
          ElMessage.success(superThis.$t("message.success"));
          superThis.$router.push("F01001");
          superThis.$store.commit("setActiveUri", "/F01001");
        })
        .catch(function (error) {
          console.log(error);
          ElMessage.error(superThis.$t("message.error"));
        });
    },
  },
};
</script>
