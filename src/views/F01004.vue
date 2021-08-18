<template>
  <div class="activate">
    <h1>{{ $t("F01004.hello") }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    activate() {
      let superThis = this;
      superThis.$store.commit("setActiveUri", "/F01004");

      if (superThis.$route.params.token === "") {
        return;
      }

      axios
        .post("/signup/activate", { token: superThis.$route.params.token })
        .then(function (response) {
          if (response.data.systemMessage === "TOKEN_E001") {
            superThis.$message.error(superThis.$t("F01004.failed"));
            return;
          }
          // Not accurate condition
          if (typeof response.data.id === "undefined") {
            superThis.$message.success(superThis.$t("F01004.activated"));
            return;
          }
          superThis.$message.success(superThis.$t("F01004.success"));
        })
        .catch(function (error) {
          console.log(error);
          superThis.$message.error(superThis.$t("message.error"));
        });
    },
  },
  mounted: function () {
    this.activate();
  },
};
</script>
