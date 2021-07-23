import axios from "axios";
import moment from 'moment';
import { ElLoading, ElMessage } from 'element-plus';

// validation block start =====================================================
function validFindAllByUserId(findAllByUserIdFormRef) {
  this.$refs[findAllByUserIdFormRef].validate((valid, field) => {
    if (!valid) {
      this.findAllByUserIdFormVisible = true;
      return false;
    }
    this.findAllByUserIdFormVisible = false;
    this.findAllByUserId();
  });
}

function validfindOneByDocumentId(findOneByDocumentIdFormRef) {
  this.$refs[findOneByDocumentIdFormRef].validate((valid, field) => {
    if (!valid) {
      this.findOneByDocumentIdFormVisible = true;
      return false;
    }
    this.findOneByDocumentIdFormVisible = false;
    this.findOneByDocumentId();
  });
}

function validAddDocument(addDocumentFormRef) {
  this.$refs[addDocumentFormRef].validate((valid, field) => {
    if (!valid) {
      this.addDocumentFormVisible = true;
      return false;
    }
    this.addDocumentFormVisible = false;
    ElMessage.success('Success');
    this.addDocument();
  });
}
// validation block end =======================================================
// button block start =========================================================
function findAllByUserId() {
  let superThis = this;
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .get("/" + superThis.findAllByUserIdFormModel.userId + "&" + superThis.buildQueryString(), {
      baseURL: "http://localhost:8080/api/v1.0.0/todolist",
    })
    .then(function (response) {
      loadingInstance.close();
      superThis.tableData = response.data;
    })
    .catch(function (error) {
      console.log(error);
      loadingInstance.close();
      ElMessage.error(superThis.$t('message.error'));
    });
}

function findOneByDocumentId() {
  let superThis = this;
  let monoData = [];
  let loadingInstance = ElLoading.service(this.ElLoadingConfig);

  axios
    .get("/" + superThis.findOneByDocumentIdFormModel.documentId, {
      baseURL: "http://localhost:8080/api/v1.0.0/todolist",
    })
    .then(function (response) {
      loadingInstance.close();
      monoData.push(response.data);
      superThis.tableData = monoData;
    })
    .catch(function (error) {
      console.log(error);
      ElMessage.error(superThis.$t('message.error'));
    });
}

function addDocument() {
  
}
// button block end ===========================================================
// helper block start =========================================================
function buildQueryString() {
  let sortBy1 = this.findAllByUserIdFormModel.sortBy1;
  let sortBy2 = this.findAllByUserIdFormModel.sortBy2;
  let sortBy3 = this.findAllByUserIdFormModel.sortBy3;

  let direct1 = this.findAllByUserIdFormModel.sortDirection1;
  let direct2 = this.findAllByUserIdFormModel.sortDirection2;
  let direct3 = this.findAllByUserIdFormModel.sortDirection3;
  direct1 = (typeof direct1 === 'undefined') ? 'ASC' : direct1;
  direct2 = (typeof direct2 === 'undefined') ? 'ASC' : direct2;
  direct3 = (typeof direct3 === 'undefined') ? 'ASC' : direct3;

  let sort1 = (typeof sortBy1 === 'undefined' || sortBy1.length == 0) ? '' : sortBy1 + ":" + direct1;
  let sort2 = (typeof sortBy2 === 'undefined' || sortBy2.length == 0) ? '' : sortBy2 + ":" + direct2;
  let sort3 = (typeof sortBy3 === 'undefined' || sortBy3.length == 0) ? '' : sortBy3 + ":" + direct3;

  let ary = [sort1, sort2, sort3];
  let queryString = ary.filter(str => str.length > 0).join(',');
  return queryString;
}

function dateFormat(row, column, cellValue, index) {
  return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
}

function setDisable(value, methodIndex) {
  // while change option, set previous to default 0
  let prev = this.findAllByUserIdFormModel.sortByOptions.find(opt => opt.methodIndex === methodIndex);
  if (typeof prev !== 'undefined') {
    prev.disabled = false;
    prev.methodIndex = 0;
  }

  // return while using default clear 'x' icon
  if (value.length == 0) { return false; }

  // set selected option to method index
  let target = this.findAllByUserIdFormModel.sortByOptions.find(opt => opt.value === value);
  target.disabled = true;
  target.methodIndex = methodIndex;
}

function handleCurrentChange(currentRow, oldCurrentRow) {
  this.targetRow = (currentRow == null) ? "" : currentRow.id;
}
// helper block end ===========================================================
// data block start ===========================================================
function getApiMenuData() {
  return {
    targetRow: "",
    tableData: [],
    ElLoadingConfig: {
      target: ".apiresult"
    },
    rules: {
      userId: [
        { required: true, trigger: 'blur', message: this.$t('rules.required') },
        { max: 5, trigger: 'blur', message: this.$t('rules.max5') },
        { pattern: new RegExp(/^[a-zA-Z0-9]*$/), trigger: 'blur', message: this.$t('rules.alphanumeric') }
      ],
      documentId: [
        { required: true, trigger: 'blur', message: this.$t('rules.required') },
        { max: 24, trigger: 'blur', message: this.$t('rules.max24') },
        { pattern: new RegExp(/^[a-zA-Z0-9]*$/), trigger: 'blur', message: this.$t('rules.alphanumeric') }
      ],
      creator: [
        { required: true, trigger: 'blur', message: this.$t('rules.required') },
        { max: 5, trigger: 'blur', message: this.$t('rules.max5') },
        { pattern: new RegExp(/^[a-zA-Z0-9]*$/), trigger: 'blur', message: this.$t('rules.alphanumeric') }
      ],
      title:[
        { required: true, trigger: 'blur', message: this.$t('rules.required') },
        { max: 24, trigger: 'blur', message: this.$t('rules.max24') },
      ],
      content: [
        { required: true, trigger: 'blur', message: this.$t('rules.required') },
        { max: 120, trigger: 'blur', message: this.$t('rules.max120') },
      ]
    },
    findAllByUserIdFormVisible: false,
    findAllByUserIdFormModel: {
      userId: "",
      sortBy1: "",
      sortBy2: "",
      sortBy3: "",
      sortByOptions: [
        {
          label: this.$t('F03001.createdAt'),
          value: "createdAt",
          disabled: false,
          methodIndex: 0
        },
        {
          label: this.$t('F03001.updatedAt'),
          value: "updatedAt",
          disabled: false,
          methodIndex: 0
        },
        {
          label: this.$t('F03001.expirationDate'),
          value: "expirationDate",
          disabled: false,
          methodIndex: 0
        },
      ],
      sortDirection1: "",
      sortDirection2: "",
      sortDirection3: "",
      sortDirectionOptions: [
        {
          label: this.$t('sort.asc'),
          value: "ASC"
        },
        {
          label: this.$t('sort.desc'),
          value: "DESC"
        },
      ],
    },
    findOneByDocumentIdFormVisible: false,
    findOneByDocumentIdFormModel: {
      documentId: ""
    },
    addDocumentFormVisible: false,
    addDocumentFormModel: {
      creator: "",
      title: "",
      content: "",
      expirationDate: "",
      sharedTo: ""
    }
  };
}
// data block end =============================================================

export default {
  name: 'F03001JS',
  methods: {
    validFindAllByUserId,
    validfindOneByDocumentId,
    validAddDocument,

    findAllByUserId,
    findOneByDocumentId,

    buildQueryString,
    dateFormat,
    setDisable,

    getApiMenuData,
    handleCurrentChange
  }
};
