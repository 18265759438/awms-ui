<template>
  <div class="add">
    <bread-crumb propsData="区域控制器"></bread-crumb>
    <!-- 区域控制器详情 -->
    <el-button type="primary" plain style="margin-bottom:20px" @click="addAreaController">添加区域控制器</el-button>
    <el-table
      :data="areaController"
      style="width: 82%"
      max-height="500"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :default-sort="{ prop: 'date', order: 'descending' }"
      border
    >
      <el-table-column fixed prop="date" label="日期" width="150" align="center"></el-table-column>
      <el-table-column prop="ip" label="ip地址" width="150" align="center"></el-table-column>
      <el-table-column label="设备" min-width="300" align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.index"
            v-for="tag in scope.row.storeHouseSet"
            closable
            :disable-transitions="false"
            style="margin-right: 8px"
          >{{tag.value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="区域控制器参数" :visible.sync="areaControllerVisible" width="30%">
      <!-- :before-close="handleClose" -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="ip地址" prop="ip">
          <el-input v-model="ruleForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="温湿度一体机" name="type"></el-checkbox>
            <el-checkbox label="空调" name="type"></el-checkbox>
            <el-checkbox label="云测仪" name="type"></el-checkbox>
            <el-checkbox label="空气净化器" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="areaControllerVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAreaController('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/breadCrumb.vue'
export default {
  name: 'add',
  components: { BreadCrumb },
  data() {
    return {
      areaController: [
        {
          date: '2019-1-1',
          ip: '192.168.1.1',
          storeHouseSet: [
            { value: '温湿度一体机' },
            { value: '云测一' },
            { value: '空调' },
            { value: '空气净化器' }
          ]
        },
        {
          date: '2020-1-1',
          ip: '192.168.1.2',
          storeHouseSet: [
            { value: '云测一' },
            { value: '空调' },
            { value: '空气净化器' }
          ]
        }
      ],
      ruleForm: {
        ip: '',
        type: []
      },
      rules: {
        ip: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      areaControllerVisible: false
    }
  },
  methods: {
    /* 添加区域控制 */
    addAreaController() {
      this.areaControllerVisible = true
    },
    /* 确认表单 */
    handleAreaController(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.type)
          this.areaControllerVisible = false
        }
      })
    },

    /* 删除索引 */
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>

<style></style>
