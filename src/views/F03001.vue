<template>
  <div class="apibutton">
    <el-button type="primary" @click="findAllVisible = true">{{
      $t("F03001.findAll")
    }}</el-button>
    <el-button type="info" @click="findOneVisible = true">{{
      $t("F03001.findOne")
    }}</el-button>
    <el-button type="success" @click="addVisible = true">{{
      $t("button.add")
    }}</el-button>
    <el-button type="warning" @click="beforeModify">{{
      $t("button.modify")
    }}</el-button>
    <el-button type="danger" @click="beforeRemove">{{
      $t("button.remove")
    }}</el-button>
  </div>

  <div class="apiresult">
    <el-table
      border
      stripe
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" style="width: 100%"></el-table-column>
      <el-table-column
        prop="id"
        :label="$t('F03001.documentId')"
        style="width: 100%"
      ></el-table-column>
      <el-table-column
        prop="creator"
        :label="$t('F03001.creator')"
        style="width: 100%"
      ></el-table-column>
      <el-table-column
        prop="title"
        :label="$t('F03001.title')"
        style="width: 100%"
      ></el-table-column>
      <el-table-column
        prop="content"
        :label="$t('F03001.content')"
        style="width: 100%"
      ></el-table-column>
      <el-table-column
        prop="expirationDate"
        :label="$t('F03001.expirationDate')"
        style="width: 100%"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="sharedTo"
        :label="$t('F03001.sharedTo')"
        style="width: 100%"
      ></el-table-column>
      <el-table-column
        prop="createdAt"
        :label="$t('F03001.createdAt')"
        style="width: 100%"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="updatedAt"
        :label="$t('F03001.updatedAt')"
        style="width: 100%"
        :formatter="dateFormat"
      ></el-table-column>
    </el-table>
  </div>

  <div class="findall">
    <el-dialog
      :title="$t('F03001.findAll')"
      v-model="findAllVisible"
      destroy-on-close
    >
      <el-form
        :model="findAllForm"
        :rules="rules"
        ref="findAllRef"
        label-width="15%"
      >
        <el-form-item :label="$t('F03001.userId')" prop="userId">
          <el-input v-model="findAllForm.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 1'">
          <el-select
            v-model="findAllForm.sortBy1"
            :placeholder="$t('option.placeholder')"
            clearable
            @change="setDisable(findAllForm.sortBy1, '1')"
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortByOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
              :disabled="opt.disabled"
            ></el-option>
          </el-select>
          <el-select
            v-model="findAllForm.sortDirection1"
            :placeholder="$t('option.placeholder')"
            clearable
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortDirectionOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 2'">
          <el-select
            v-model="findAllForm.sortBy2"
            :placeholder="$t('option.placeholder')"
            clearable
            @change="setDisable(findAllForm.sortBy2, '2')"
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortByOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
              :disabled="opt.disabled"
            ></el-option>
          </el-select>
          <el-select
            v-model="findAllForm.sortDirection2"
            :placeholder="$t('option.placeholder')"
            clearable
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortDirectionOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sort.label') + ' 3'">
          <el-select
            v-model="findAllForm.sortBy3"
            :placeholder="$t('option.placeholder')"
            clearable
            @change="setDisable(findAllForm.sortBy3, '3')"
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortByOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
              :disabled="opt.disabled"
            ></el-option>
          </el-select>
          <el-select
            v-model="findAllForm.sortDirection3"
            :placeholder="$t('option.placeholder')"
            clearable
            style="width: 50%"
          >
            <el-option
              v-for="(opt, idx) in findAllForm.sortDirectionOptions"
              :key="idx"
              :label="opt.label"
              :value="opt.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validFindAll('findAllRef')">{{
          $t("button.confirm")
        }}</el-button>
        <el-button type="danger" @click="findAllVisible = false">{{
          $t("button.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="findone">
    <el-dialog
      :title="$t('F03001.findOne')"
      v-model="findOneVisible"
      destroy-on-close
    >
      <el-form :model="findOneForm" :rules="rules" ref="findOneRef">
        <el-form-item :label="$t('F03001.documentId')" prop="documentId">
          <el-input
            v-model="findOneForm.documentId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validFindOne('findOneRef')">{{
          $t("button.confirm")
        }}</el-button>
        <el-button type="danger" @click="findOneVisible = false">{{
          $t("button.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="addone">
    <el-dialog :title="$t('button.add')" v-model="addVisible" destroy-on-close>
      <el-form :model="addForm" :rules="rules" ref="addRef" label-width="15%">
        <el-form-item :label="$t('F03001.creator')" prop="creator">
          <el-input v-model="addForm.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.title')" prop="title">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.content')" prop="content">
          <el-input v-model="addForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('F03001.expirationDate')"
          prop="expirationDate"
        >
          <el-date-picker
            v-model="addForm.expirationDate"
            type="datetime"
            :placeholder="$t('option.placeholder')"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('F03001.sharedTo')" prop="sharedTo">
          <el-input v-model="addForm.sharedTo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validAddDocument('addRef')">{{
          $t("button.confirm")
        }}</el-button>
        <el-button type="danger" @click="addVisible = false">{{
          $t("button.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="modify">
    <el-dialog
      :title="$t('button.modify')"
      v-model="modifyVisible"
      destroy-on-close
    >
      <el-form
        :model="modifyForm"
        :rules="rules"
        ref="modifyRef"
        label-width="15%"
      >
        <el-form-item :label="$t('F03001.title')" prop="title">
          <el-input v-model="modifyForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('F03001.content')" prop="content">
          <el-input v-model="modifyForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('F03001.expirationDate')"
          prop="expirationDate"
        >
          <el-date-picker
            v-model="modifyForm.expirationDate"
            type="datetime"
            :placeholder="$t('option.placeholder')"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('F03001.sharedTo')" prop="sharedTo">
          <el-input v-model="modifyForm.sharedTo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="validModifyDocument('modifyRef')">{{
          $t("button.confirm")
        }}</el-button>
        <el-button type="danger" @click="modifyVisible = false">{{
          $t("button.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="remove">
    <el-dialog
      :title="$t('button.remove')"
      v-model="removeVisible"
      destroy-on-close
    >
      <span class="dialog-footer">
        <el-button type="primary" @click="removeDocument">{{
          $t("button.confirm")
        }}</el-button>
        <el-button type="danger" @click="removeVisible = false">{{
          $t("button.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import F03001JS from "../methods/F03001";

export default {
  name: "F03001",
  data() {
    return this.getApiMenuData();
  },
  methods: F03001JS.methods,
};
</script>
