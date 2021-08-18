<template>
  <div class="reactivate">
    <h1>{{ $t("F01005.hello") }}</h1>
    <el-form
      :model="reactivateForm"
      :rules="rules"
      ref="reactivateRef"
      label-width="15%"
    >
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="reactivateForm.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
        <el-input v-model="reactivateForm.email"></el-input>
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
      reactivateForm: {
        username: "",
        email: "",
      },
      ElLoadingConfig: {
        target: ".reactivate",
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
      this.$refs["reactivateRef"].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.reactivate();
      });
    },
    reactivate() {
      let superThis = this;
      let loadingInstance = superThis.$loading(superThis.ElLoadingConfig);

      axios
        .post("/signup/reactivate", {
          username: superThis.reactivateForm.username,
          email: superThis.reactivateForm.email,
        })
        .then(function (response) {
          if (typeof response.data.id === "undefined") {
            superThis.$message.error(superThis.$t("username.notExist"));
            return;
          }
          superThis.$message.success(superThis.$t("message.success"));
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
