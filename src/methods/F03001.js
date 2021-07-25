import axios from "axios";
import moment from "moment";
import { ElLoading, ElMessage } from "element-plus";

// validation block start =====================================================
function validFindAll(findAllRef) {
  this.$refs[findAllRef].validate((valid) => {
    if (!valid) {
      return false;
    }
    this.findAllVisible = false;
    this.findAllByUserId();
  });
}

function validFindOne(findOneRef) {
  this.$refs[findOneRef].validate((valid) => {
    if (!valid) {
      return false;
    }
    this.findOneVisible = false;
    this.findOneByDocumentId();
  });
}

function validAddDocument(addRef) {
  this.$refs[addRef].validate((valid) => {
    if (!valid) {
      return false;
    }
    this.addVisible = false;
    this.addDocument();
  });
}
function validModifyDocument(modifyRef) {
  this.$refs[modifyRef].validate((valid) => {
    if (!valid) {
      return false;
    }
    this.modifyVisible = false;
    this.modifyDocument();
  });
}

// validation block end =======================================================
// button block start =========================================================
function findAllByUserId() {
  let superThis = this;
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .get(superThis.findAllForm.userId + "&" + superThis.buildQueryString())
    .then(function (response) {
      superThis.tableData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
    });
}

function findOneByDocumentId() {
  let superThis = this;
  let monoData = [];
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .get(superThis.findOneForm.documentId)
    .then(function (response) {
      monoData.push(response.data);
      superThis.tableData = monoData;
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
    });
}

function addDocument() {
  let superThis = this;
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .post("/", {
      creator: superThis.addForm.creator,
      title: superThis.addForm.title,
      content: superThis.addForm.content,
      expirationDate: superThis.addForm.expirationDate,
      sharedTo: superThis.addForm.sharedTo.split(","),
    })
    .then(function (response) {
      ElMessage.success(superThis.$t("message.success"));
      return response.data.id;
    })
    .then(function (id) {
      superThis.findOneForm.documentId = id;
      superThis.findOneByDocumentId();
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
    });
}

function beforeModify() {
  let superThis = this;
  if (superThis.targetRow.id.length == 0) {
    return;
  }

  let loadingInstance = ElLoading.service(this.ElLoadingConfig);
  axios
    .get(superThis.targetRow.id)
    .then(function (response) {
      superThis.modifyForm = response.data;
      superThis.modifyVisible = true;
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
    });
}

function modifyDocument() {
  let superThis = this;
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);
  let modifyShared = superThis.modifyForm.sharedTo;

  axios
    .put(superThis.targetRow.id, {
      creator: superThis.modifyForm.creator,
      title: superThis.modifyForm.title,
      content: superThis.modifyForm.content,
      expirationDate: superThis.modifyForm.expirationDate,
      sharedTo:
        typeof modifyShared === "string"
          ? modifyShared.split(",")
          : modifyShared,
    })
    .then(function (response) {
      ElMessage.success(superThis.$t("message.success"));
      return response.data.id;
    })
    .then(function (id) {
      superThis.findOneForm.documentId = id;
      superThis.findOneByDocumentId();
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
    });
}

function beforeRemove() {
  let superThis = this;
  if (superThis.targetRow.id.length == 0) {
    return;
  }
  superThis.removeVisible = true;
}

function removeDocument() {
  let superThis = this;
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .delete(superThis.targetRow.id)
    .then(function () {
      ElMessage.success(superThis.$t("message.success"));
      return superThis.targetRow.creator;
    })
    .then(function (id) {
      superThis.findAllForm.userId = id;
      superThis.findAllByUserId();
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t("message.error"));
    })
    .finally(function () {
      loadingInstance.close();
      superThis.removeVisible = false;
    });
}
// button block end ===========================================================
// helper block start =========================================================
function buildQueryString() {
  let sortBy1 = this.findAllForm.sortBy1;
  let sortBy2 = this.findAllForm.sortBy2;
  let sortBy3 = this.findAllForm.sortBy3;

  let direct1 = this.findAllForm.sortDirection1;
  let direct2 = this.findAllForm.sortDirection2;
  let direct3 = this.findAllForm.sortDirection3;
  direct1 = typeof direct1 === "undefined" ? "ASC" : direct1;
  direct2 = typeof direct2 === "undefined" ? "ASC" : direct2;
  direct3 = typeof direct3 === "undefined" ? "ASC" : direct3;

  let sort1 =
    typeof sortBy1 === "undefined" || sortBy1.length == 0
      ? ""
      : sortBy1 + ":" + direct1;
  let sort2 =
    typeof sortBy2 === "undefined" || sortBy2.length == 0
      ? ""
      : sortBy2 + ":" + direct2;
  let sort3 =
    typeof sortBy3 === "undefined" || sortBy3.length == 0
      ? ""
      : sortBy3 + ":" + direct3;

  let ary = [sort1, sort2, sort3];
  let queryString = ary.filter((str) => str.length > 0).join(",");
  return queryString;
}

function dateFormat(row, column) {
  let value = row[column.property];
  let formatter = moment(new Date(value));
  if (formatter.isValid()) {
    return formatter.format("YYYY-MM-DD HH:mm:ss");
  }
  return value;
}

function setDisable(value, methodIndex) {
  // while change option, set previous to default 0
  let prev = this.findAllForm.sortByOptions.find(
    (opt) => opt.methodIndex === methodIndex
  );
  if (typeof prev !== "undefined") {
    prev.disabled = false;
    prev.methodIndex = 0;
  }

  // return while using default clear 'x' icon
  if (value.length == 0) {
    return false;
  }

  // set selected option to method index
  let target = this.findAllForm.sortByOptions.find(
    (opt) => opt.value === value
  );
  target.disabled = true;
  target.methodIndex = methodIndex;
}

function handleCurrentChange(currentRow) {
  this.targetRow = currentRow == null ? "" : currentRow;
}

function disabledDate(time) {
  return time.getTime() < Date.now();
}

function setShortcuts(time) {
  let date = new Date();
  date.setTime(date.getTime() + time);
  return date;
}
// helper block end ===========================================================
// data block start ===========================================================
function getApiMenuData() {
  return {
    targetRow: "",
    tableData: [],
    ElLoadingConfig: {
      target: ".apiresult",
    },
    shortcuts: [
      {
        text: this.$t("date.tomorrow"),
        value: setShortcuts(1000 * 60 * 60 * 24),
      },
      {
        text: this.$t("date.nextweek"),
        value: setShortcuts(1000 * 60 * 60 * 24 * 7),
      },
    ],
    rules: {
      userId: [
        { required: true, trigger: "blur", message: this.$t("rules.required") },
        { max: 5, trigger: "blur", message: this.$t("rules.max5") },
        {
          pattern: new RegExp(/^[a-zA-Z0-9]*$/),
          trigger: "blur",
          message: this.$t("rules.alphanumeric"),
        },
      ],
      documentId: [
        { required: true, trigger: "blur", message: this.$t("rules.required") },
        { max: 24, trigger: "blur", message: this.$t("rules.max24") },
        {
          pattern: new RegExp(/^[a-zA-Z0-9]*$/),
          trigger: "blur",
          message: this.$t("rules.alphanumeric"),
        },
      ],
      creator: [
        { required: true, trigger: "blur", message: this.$t("rules.required") },
        { max: 5, trigger: "blur", message: this.$t("rules.max5") },
        {
          pattern: new RegExp(/^[a-zA-Z0-9]*$/),
          trigger: "blur",
          message: this.$t("rules.alphanumeric"),
        },
      ],
      title: [
        { required: true, trigger: "blur", message: this.$t("rules.required") },
        { max: 24, trigger: "blur", message: this.$t("rules.max24") },
      ],
      content: [
        { required: true, trigger: "blur", message: this.$t("rules.required") },
        { max: 120, trigger: "blur", message: this.$t("rules.max120") },
      ],
    },
    findAllVisible: false,
    findOneVisible: false,
    addVisible: false,
    modifyVisible: false,
    removeVisible: false,
    findAllForm: {
      userId: "",
      sortBy1: "",
      sortBy2: "",
      sortBy3: "",
      sortByOptions: [
        {
          label: this.$t("F03001.createdAt"),
          value: "createdAt",
          disabled: false,
          methodIndex: 0,
        },
        {
          label: this.$t("F03001.updatedAt"),
          value: "updatedAt",
          disabled: false,
          methodIndex: 0,
        },
        {
          label: this.$t("F03001.expirationDate"),
          value: "expirationDate",
          disabled: false,
          methodIndex: 0,
        },
      ],
      sortDirection1: "",
      sortDirection2: "",
      sortDirection3: "",
      sortDirectionOptions: [
        {
          label: this.$t("sort.asc"),
          value: "ASC",
        },
        {
          label: this.$t("sort.desc"),
          value: "DESC",
        },
      ],
    },
    findOneForm: {
      documentId: "",
    },
    addForm: {
      creator: "",
      title: "",
      content: "",
      expirationDate: "",
      sharedTo: "",
    },
    modifyForm: {
      title: "",
      content: "",
      expirationDate: "",
      sharedTo: "",
    },
  };
}
// data block end =============================================================

export default {
  name: "F03001JS",
  methods: {
    validFindAll,
    validFindOne,
    validAddDocument,
    validModifyDocument,

    findAllByUserId,
    findOneByDocumentId,
    addDocument,
    beforeModify,
    modifyDocument,
    beforeRemove,
    removeDocument,

    buildQueryString,
    dateFormat,
    setDisable,
    disabledDate,
    setShortcuts,

    getApiMenuData,
    handleCurrentChange,
  },
};
