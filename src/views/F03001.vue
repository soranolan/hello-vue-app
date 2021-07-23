<template>
  <div class="apibutton">
    <el-button type="primary" @click="findAllByUserIdFormVisible = true">{{ $t('F03001.findAll') }}</el-button>
    <el-button type="info" @click="findOneByDocumentIdFormVisible = true">{{ $t('F03001.findOne') }}</el-button>
    <el-button type="success" @click="addDocumentFormVisible = true">{{ $t('button.add') }}</el-button>
    <el-button type="warning">{{ $t('button.modify') }}</el-button>
    <el-button type="danger">{{ $t('button.remove') }}</el-button>
  </div>

  <div class="apiresult">
    <el-table border stripe highlight-current-row :data="tableData" style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column type="index" style="width: 100%"></el-table-column>
      <el-table-column prop="id" :label="$t('F03001.documentId')" style="width: 100%"></el-table-column>
      <el-table-column prop="creator" :label="$t('F03001.creator')" style="width: 100%"></el-table-column>
      <el-table-column prop="title" :label="$t('F03001.title')" style="width: 100%"></el-table-column>
      <el-table-column prop="content" :label="$t('F03001.content')" style="width: 100%"></el-table-column>
      <el-table-column prop="expirationDate" :label="$t('F03001.expirationDate')" style="width: 100%" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="sharedTo" :label="$t('F03001.sharedTo')" style="width: 100%"></el-table-column>      
      <el-table-column prop="createdAt" :label="$t('F03001.createdAt')" style="width: 100%" :formatter="dateFormat"></el-table-column>      
      <el-table-column prop="updatedAt" :label="$t('F03001.updatedAt')" style="width: 100%" :formatter="dateFormat"></el-table-column>
    </el-table>
  </div>
  
  <div class="findall">
    <el-dialog :title="$t('F03001.findAll')" v-model="findAllByUserIdFormVisible" destroy-on-close>
      <el-form :model="findAllByUserIdFormModel" :rules="rules" ref="findAllByUserIdFormRef">
        <el-form-item :label="$t('F03001.userId')" prop="userId">
          <el-input v-model="findAllByUserIdFormModel.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 1'">
          <el-select v-model="findAllByUserIdFormModel.sortBy1" :placeholder="$t('option.placeholder')" clearable @change="setDisable(findAllByUserIdFormModel.sortBy1, '1')">
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortByOptions" :key="idx" :label="opt.label" :value="opt.value" :disabled="opt.disabled"></el-option>
          </el-select>
          <el-select v-model="findAllByUserIdFormModel.sortDirection1" :placeholder="$t('option.placeholder')" clearable>
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortDirectionOptions" :key="idx" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 2'">
          <el-select v-model="findAllByUserIdFormModel.sortBy2" :placeholder="$t('option.placeholder')" clearable @change="setDisable(findAllByUserIdFormModel.sortBy2, '2')">
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortByOptions" :key="idx" :label="opt.label" :value="opt.value" :disabled="opt.disabled"></el-option>
          </el-select>
          <el-select v-model="findAllByUserIdFormModel.sortDirection2" :placeholder="$t('option.placeholder')" clearable>
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortDirectionOptions" :key="idx" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 3'">
          <el-select v-model="findAllByUserIdFormModel.sortBy3" :placeholder="$t('option.placeholder')" clearable @change="setDisable(findAllByUserIdFormModel.sortBy3, '3')">
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortByOptions" :key="idx" :label="opt.label" :value="opt.value" :disabled="opt.disabled"></el-option>
          </el-select>
          <el-select v-model="findAllByUserIdFormModel.sortDirection3" :placeholder="$t('option.placeholder')" clearable>
            <el-option v-for="(opt, idx) in findAllByUserIdFormModel.sortDirectionOptions" :key="idx" :label="opt.label" :value="opt.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validFindAllByUserId('findAllByUserIdFormRef')">{{ $t('button.confirm') }}</el-button>
        <el-button type="danger" @click="findAllByUserIdFormVisible = false">{{ $t('button.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="findone">
    <el-dialog :title="$t('F03001.findOne')" v-model="findOneByDocumentIdFormVisible" destroy-on-close>
      <el-form :model="findOneByDocumentIdFormModel" :rules="rules" ref="findOneByDocumentIdFormRef">
        <el-form-item :label="$t('F03001.documentId')" prop="documentId">
          <el-input v-model="findOneByDocumentIdFormModel.documentId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validfindOneByDocumentId('findOneByDocumentIdFormRef')">{{ $t('button.confirm') }}</el-button>
        <el-button type="danger" @click="findOneByDocumentIdFormVisible = false">{{ $t('button.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="addone">
    <el-dialog :title="$t('button.add')" v-model="addDocumentFormVisible" destroy-on-close>
      <el-form :model="addDocumentFormModel" :rules="rules" ref="addDocumentFormRef" label-position="top">
        <el-form-item :label="$t('F03001.creator')" prop="creator">
          <el-input v-model="addDocumentFormModel.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.title')" prop="title">
          <el-input v-model="addDocumentFormModel.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.content')" prop="content">
          <el-input v-model="addDocumentFormModel.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.expirationDate')" prop="expirationDate">
          <el-input v-model="addDocumentFormModel.expirationDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.sharedTo')" prop="sharedTo">
          <el-input v-model="addDocumentFormModel.sharedTo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validAddDocument('addDocumentFormRef')">{{ $t('button.confirm') }}</el-button>
        <el-button type="danger" @click="addDocumentFormVisible = false">{{ $t('button.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import F03001JS from '../methods/F03001';

export default {
  name: "F03001",
  data() { return this.getApiMenuData(); },
  methods: F03001JS.methods,
};
</script>
