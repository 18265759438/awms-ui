<template>
  <div class="manage">
    <bread-crumb propsData="设备管理"></bread-crumb>
    <div class="action-buttons">
      <div>
        <el-button type="primary" plain style="margin-bottom:20px" @click="toAdd">区域控制器</el-button>
      </div>
      <div>
        <el-button type="primary" plain style="margin-bottom:20px" @click="addStorehouse">添加库房</el-button>
        <el-button
          type="primary"
          plain
          style="margin-bottom:20px"
          @click="updataStoreHouse(editableTabsValue)"
        >修改库房</el-button>
        <el-button
          type="primary"
          plain
          style="margin-bottom:20px"
          @click="removeStoreHouse(editableTabsValue)"
        >删除库房</el-button>
      </div>
    </div>

    <el-tabs v-model="editableTabsValue" tab-position="top">
      <el-tab-pane :label="item.name" v-for="item in intercalate" :key="item.id" :name="item.id">
        <div
          class="drag-home"
          :style="{
            backgroundImage: 'url(' + item.url + ')',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }"
          @drop="drop($event)"
          @dragover.prevent
        >
          <div
            class="drag-end-item"
            v-for="(item1, index) in item.infoList"
            :key="index"
            :id="item1.value"
            v-Draggable="{
              dragStart: onDragStart,
              drag: onDragAllow,
              dragEnd: onDragEnd
            }"
            :style="{ left: item1.left + 'px', top: item1.top + 'px' }"
            @click="showDialog(item1.id)"
          >
            <div class="set-header">user</div>
            <span>{{ item1.title }}</span>
            <div class="remove" @click.stop="removeFormLabelAlign(item1.id)">
              <i class="el-icon-close close"></i>
            </div>
          </div>
        </div>
        <div class="drag-self">
          <div
            class="drag-start-item"
            v-for="(item2, index) in areaControllerEquipmentItem.storeHouseSet"
            :key="index"
            draggable="true"
            @dragstart="dragStart($event)"
          >
            <div class="set-header">user</div>
            <span>{{ item2.value }}</span>
          </div>
        </div>
        <!-- 设备参数 -->
        <el-dialog title="参数设置" :visible.sync="centerDialogVisible" width="30%" center>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="1">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="2">
              <el-input v-model="formLabelAlign.age"></el-input>
            </el-form-item>
            <el-form-item label="3">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveFormLabelAlign">保存</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
    <div
      v-if="intercalate.length === 0"
      style="height:200px;text-align: center;line-height: 200px;"
    >暂无库房,请您添加库房</div>
    <!-- 库房添加弹出框 -->
    <el-dialog title="库房参数设置" :visible.sync="centerDialogVisible1" width="30%" center>
      <!-- 选择区域控制器 -->
      <el-row class="cat_opt">
        <el-select v-model="selectValue" placeholder="区域控制器" @change="changeValue">
          <el-option v-for="item in areaController" :key="item.value" :value="item.ip"></el-option>
        </el-select>
        <!-- 区域控制器设备 -->
        <el-tag
          v-for="tag in areaControllerIndexItem.storeHouseSet"
          :key="tag.index"
          closable
        >{{ tag.value }}</el-tag>
      </el-row>

      <!-- 库房参数 -->
      <el-form
        v-if="areaControllerIndexItem.storeHouseSet != null"
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign1"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="库房名称" prop="name">
          <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="库房图片" prop="url">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleAvatarSuccess"
            :on-exceed="fileLimit"
            :limit="1"
            ref="upload"
            list-type="picture"
          >
            <!-- 
              :on-preview="handlePreview"
            :on-remove="handleRemove"-->

            <el-button size="small" type="primary">点击上传</el-button>
            <el-button size="small" type="primary" @click="handleUpload">重新上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="roomFormLabelAlign('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改库房弹出框 -->
    <el-dialog title="库房参数设置" :visible.sync="centerDialogVisible2" width="30%" center>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign1"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="库房名称" prop="name">
          <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="库房图片" prop="url">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleAvatarSuccess"
            :on-exceed="fileLimit"
            :limit="1"
            ref="upload"
            list-type="picture"
          >
            <el-button size="small" type="primary" @click="handleUpload">重新上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="updataFormLabelAlign">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getStorageInfo,
//   addStorage,
//   delStorage,
//   addEquipment,
//   delEquipment
// } from '@/api/index'
import BreadCrumb from '@/components/breadCrumb.vue'

export default {
  name: 'manage',
  components: { BreadCrumb },
  data() {
    return {
      editableTabsValue: '1',
      roomImageUrl: '',
      areaController: [
        {
          ip: '192.168.1.1',
          storeHouseSet: [
            { value: '温湿度一体机' },
            { value: '云测一' },
            { value: '空调' },
            { value: '空气净化器' }
          ]
        },
        {
          ip: '192.168.1.2',
          storeHouseSet: [
            { value: '云测一' },
            { value: '空调' },
            { value: '空气净化器' }
          ]
        }
      ],
      areaControllerIndexItem: {
        storeHouseSet: null
      },
      areaControllerEquipmentItem: {
        ip: '192.168.1.1',
        storeHouseSet: [
          { value: '温湿度一体机' },
          { value: '云测一' },
          { value: '空调' },
          { value: '空气净化器' }
        ]
      },
      selectValue: '',
      intercalate: [
        {
          name: '库房一',
          id: '1',
          //定位信息
          infoList: [],
          url: require('../../assets/Model-1.png')
        }
      ],

      // 判断弹出框对其方式
      labelPosition: 'right',
      // 设备参数
      centerDialogVisible: false,
      // 库房添加
      centerDialogVisible1: false,
      // 库房修改
      centerDialogVisible2: false,
      formLabelAlign: {
        name: '',
        age: '',
        type: ''
      },
      formLabelAlign1: {
        name: '',
        url: '',
        id: null
      },
      rules: {
        name: [{ required: true, message: '请输入库房名称', trigger: 'blur' }]
        // url: [{ required: true, message: '请上传库房图片', trigger: 'change' }]
      },
      dialogId: null,
      //拖拽开始的时间
      firstTime: null,
      flag: false,
      validImage: false
    }
  },
  methods: {
    // 获取库房信息
    // getStorageInfo() {
    //   getStorageInfo().then(res => {
    //     console.log(res)
    //   })
    // },
    //添加区域控制器
    toAdd() {
      this.$router.push('/manage/add')
    },
    //添加库房
    addStorehouse() {
      if (this.areaController.length == 0)
        return this.$message.error('请添加区域控制器')
      this.formLabelAlign1.name = ''
      this.selectValue = ''
      this.validImage = false
      this.areaControllerIndexItem.storeHouseSet = null
      this.centerDialogVisible1 = true
    },
    changeValue(ip) {
      let areaControllerIndexItem = this.areaController.find(item => {
        return item.ip == ip
      })
      this.areaControllerIndexItem = areaControllerIndexItem
    },
    //重新上传
    handleUpload() {
      this.validImage = false
      this.roomImageUrl = ''
      this.$refs.upload.clearFiles()
    },
    //文件超出时
    fileLimit() {
      this.$message.error('文件数量已超出限制,请重新上传')
    },
    handleAvatarSuccess(response, file) {
      console.log(file.url)
      this.roomImageUrl = file.url
      this.validImage = true
    },
    //确定按钮
    roomFormLabelAlign(formName) {
      if (this.areaControllerIndexItem.storeHouseSet == null)
        return this.$message.error('请选择区域控制器')
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.validImage === true) {
            let storeHouseName = {}
            this.formLabelAlign1.id = (this.intercalate.length + 1).toString()
            this.formLabelAlign1.infoList = []
            this.formLabelAlign1.url = this.roomImageUrl
            Object.assign(storeHouseName, this.formLabelAlign1)
            this.intercalate.push(storeHouseName)
            this.editableTabsValue = this.intercalate.length.toString()
            this.areaControllerEquipmentItem = this.areaControllerIndexItem
            this.centerDialogVisible1 = false
            // 添加库房接口
            // addStorage(storeHouseName).then(res => {})
            console.log(this.editableTabsValue)
            console.log(storeHouseName)
          } else {
            this.$message({
              showClose: true,
              message: '请上传图片',
              type: 'warning'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改库房
    updataStoreHouse(id) {
      console.log(id)
      this.centerDialogVisible2 = true
      // 获取到到修改的库房的信息
    },
    // 修改库房确定按钮
    updataFormLabelAlign() {
      // 修改库房接口
    },
    removeStoreHouse(id) {
      console.log(id - 1)
      this.$confirm('此操作将永久删除该库房, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let i = this.intercalate.findIndex(item => item.id === id)
          this.intercalate.splice(i, 1)
          this.editableTabsValue = (id - 1).toString()
          // 删除库房接口
          // delStorage(id).then(res => {
          //   console.log(res)
          // })
          console.log(this.editableTabsValue)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    //开始拖动
    dragStart(ev) {
      // let storeIndex = this.intercalate.findIndex(
      //   item => item.id === this.editableTabsValue
      // )
      let info = {}
      ev.dataTransfer.setData('Text', JSON.stringify(info))
      this.dom = ev.target
    },
    //进入拖动中
    drop(ev) {
      ev.preventDefault()
      //解决火狐浏览器弹出新标签页的问题
      ev.stopPropagation()
      let info = JSON.parse(ev.dataTransfer.getData('Text'))
      const [, span] = this.dom.children
      var X = ev.offsetX - this.dom.clientWidth / 2
      var Y = ev.offsetY - this.dom.clientHeight / 2
      info.left = X
      info.top = Y
      info.title = span.innerHTML
      let storeIndex = this.intercalate.findIndex(
        item => item.id === this.editableTabsValue
      )
      let areaControllerEquipmentsIndex = this.areaControllerEquipmentItem.storeHouseSet.findIndex(
        item => item.value == info.title
      )

      info.id = this.intercalate[storeIndex].infoList.length + 1
      // 拖拽设备删除
      this.areaControllerEquipmentItem.storeHouseSet.splice(
        areaControllerEquipmentsIndex,
        1
      )
      console.log(info)

      this.intercalate[storeIndex].infoList.push(info)
    },

    onDragStart() {
      const firstTime = new Date().getTime()
      this.firstTime = firstTime
    },
    onDragAllow(state) {
      //判断不能出界
      let draghomeDom = state.target.$el.parentNode.getBoundingClientRect()
      let offsetWidth =
        draghomeDom.width - state.target.$el.getBoundingClientRect().width
      let offsetHeight =
        draghomeDom.height - state.target.$el.getBoundingClientRect().height
      console.log(state.left)

      if (state.left < 0) {
        state.left = 0
      } else if (state.top < 0) {
        state.top = 0
      } else if (state.left > offsetWidth) {
        state.left = offsetWidth
      } else if (state.top > offsetHeight) {
        state.top = offsetHeight
      }
    },
    onDragEnd(state) {
      const lastTime = new Date().getTime()
      if (lastTime - this.firstTime > 10) {
        this.flag = true
        let storeIndex = this.intercalate.findIndex(
          item => item.id === this.editableTabsValue
        )
        // let id = this.intercalate[storeIndex].infoList[index].id
        let [, HTML] = state.target.$el.children
        let info = {
          left: state.left,
          top: state.top,
          title: HTML.innerHTML
        }
        let index = this.intercalate[storeIndex].infoList.findIndex(
          item => item.title === info.title
        )
        this.intercalate[storeIndex].infoList.splice(index, 1, info)
        console.log(this.intercalate[storeIndex].infoList)
        console.log(this.intercalate)
      }
    },

    // 设备弹出框
    showDialog(id) {
      //判断显示文档是点击事件还是拖拽事件
      if (this.flag == false) {
        this.centerDialogVisible = true
        console.log(id)
        this.dialogId = id
      } else if (this.flag == true) {
        this.flag = false
      }
    },
    // 删除
    removeFormLabelAlign(id) {
      console.log(id)
      this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let storeIndex = this.intercalate.findIndex(
            item => item.id === this.editableTabsValue
          )
          let index = this.intercalate[storeIndex].infoList.findIndex(
            item => item.id === id
          )
          this.intercalate[storeIndex].infoList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除设备接口
          // delEquipment(id).then(res => {
          //   console.log(res)
          // })
          console.log(this.intercalate[storeIndex].infoList)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //保存设备位置
    saveFormLabelAlign() {
      // 保存设备位置接口
      // delEquipment(id).then(res => {
      //   console.log(res)
      // })
      console.log(this.dialogId)
      console.log(this.formLabelAlign)
      console.log(this.intercalate)
    }
  }
}
</script>

<style lang="less" scoped>
.action-buttons {
  margin-right: 1%;
  display: flex;
  justify-content: space-between;
}
.cat_opt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}
.drag-home {
  width: 1632px;
  height: 500px;
  position: relative;
  margin: auto;
  .drag-end-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    .set-header {
      border-radius: 50%;
      box-sizing: border-box;
      text-align: center;
      color: #fff;
      background: #409eff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 10px;
    }
    span {
      font-size: 10px;
      color: #409eff;
    }
    &:hover .remove {
      display: block;
    }
    .remove {
      position: absolute;
      display: none;
      cursor: pointer;
      top: -30%;
      left: 50%;
      transform: translate(-50%, -50%);
      .close {
        border-radius: 50%;
        font-size: 16px;
        font-weight: bold;
        color: #409eff;
      }
      .close:hover {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
.drag-self {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 3px solid #ebeef5;
  background-color: #ebeef5;
  border-radius: 8px;
  margin: 20px 0;
}
.drag-start-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .set-header {
    border-radius: 50%;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    background: #409eff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
  }
  span {
    font-size: 10px;
    color: #409eff;
  }
}
</style>
