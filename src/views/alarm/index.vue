<template>
  <div class="alarm">
    <bread-crumb propsData="报警信息"></bread-crumb>
    <!-- 筛选 -->
    <!-- <div class="alarm-search">
      <div class="search-font">搜索:</div>
      <el-input v-model="search" placeholder="请输入搜索内容"> </el-input>
    </div>-->

    <!-- 表格 -->
    <div class="alarm-table">
      <el-table
        id="out-table"
        fit
        highlight-current-row
        border
        :data="dataMock"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="date"
          label="日期"
          align="center"
          width="100px"
          :filters="[{ text: '2018-11-5', value: '2018-11-5' }]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column
          prop="room"
          label="库房"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="app"
          label="设备"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="message"
          label="报警信息"
          align="center"
          min-width="300px"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="alarm-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[3, 5, 10, 15]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataMock.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { getAlarmInfo, getCurrentPageInfo } from '@/api/index'
import BreadCrumb from '@/components/breadCrumb.vue'

export default {
  name: 'alarm',
  components: {
    BreadCrumb
  },
  data() {
    return {
      dataMock: [
        {
          date: '2015-15-5',
          room: '库房一',
          app: '设备一',
          type: '类型一',
          message: '警报一'
        },
        {
          date: '2015-1-5',
          room: 'ads',
          app: 'da',
          type: 'da',
          message: 'sda'
        },
        {
          date: '2013-15-5',
          room: 'adads',
          app: 'g',
          type: 'as',
          message: 'fdfdg'
        },
        {
          date: '2012-15-5',
          room: '库房一',
          app: '设备一',
          type: 'g',
          message: 'g'
        },
        {
          date: '2015-15-5',
          room: '库房一',
          app: 'h',
          type: 'h',
          message: 'yyr'
        },
        {
          date: '2011-13-5',
          room: 'rtg',
          app: '设备一',
          type: '类型一',
          message: 'hghf'
        },
        {
          date: '2017-110-5',
          room: '库房一',
          app: 'dgfd',
          type: 'hgfn',
          message: 'nvrr'
        },
        {
          date: '2018-11-5',
          room: 'ghfr',
          app: '设备一',
          type: 'hehe',
          message: '警报一'
        },
        {
          date: '2015-12-5',
          room: '库房一',
          app: '设备一',
          type: 'hrh',
          message: 'he'
        },
        {
          date: '2015-13-5',
          room: 'ht',
          app: '设备一',
          type: '类型一',
          message: 'hr'
        }
      ],
      //初始页
      currentPage: 1,
      //每页条数
      pageSize: 10
    }
  },
  created() {
    // this.getAlarmInfo()
  },
  methods: {
    // 报警信息接口
    // getAlarmInfo() {
    //   getAlarmInfo().then(res => {
    //     // this.dataMock = res.data
    //     console.log(res)
    //   })
    // },
    //点击分页触发
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      console.log(newPage)
    },
    // 点击分页条数触发
    handleSizeChange(newSize) {
      console.log(newSize)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style lang="less" scoped>
.alarm {
  .alarm-pagination {
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .alarm-table {
    margin-bottom: 20px;
  }
}
</style>
