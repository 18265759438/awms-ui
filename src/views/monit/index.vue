<template>
  <div class="foo">
    <bread-crumb propsData="环境监测"></bread-crumb>

    <el-tabs type="border-card" style="width:100%">
      <el-tab-pane v-for="(item, index) in intercalate" :key="index" :label="item.name">
        <div class="foo-data">
          <div class="foo-data-charts">
            <h1>温湿度监控</h1>
            <!-- 圆饼图组件 -->
            <div class="foo-data-piechart">
              <temp-chart :dataProp="item.infoList"></temp-chart>
              <humi-chart :dataProp="item.infoList"></humi-chart>
            </div>
          </div>
          <div class="foo-data-linechart">
            <div class="foo-data-time">
              <span>日期区间</span>
              <el-date-picker
                v-model="value1"
                @change="handleDateFilter"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
              <i class="el-icon-s-grid icon-style"></i>
              <el-button
                class="btn-style"
                type="primary"
                size="mini"
                :loading="downloadLoading"
                @click="handleDownload"
                icon="el-icon-document"
              >导出</el-button>
            </div>
            <el-tabs type="card">
              <el-tab-pane style="width:100%" label="图表">
                <!-- 折线图 -->
                <line-chart :dataProp="item.infoList"></line-chart>
              </el-tab-pane>
              <el-tab-pane label="数据" style="height: 167px;padding: 0 10px 10px 10px">
                <!-- 表格 -->
                <el-table
                  id="out-table"
                  stripe
                  :data="item.infoList"
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#eef1f6',
                    color: '#606266'
                  }"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                >
                  <el-table-column prop="detail.date" label="日期" sortable width="180"></el-table-column>
                  <el-table-column prop="detail.temp" label="温度" sortable width="90"></el-table-column>
                  <el-table-column prop="detail.humi" label="湿度" sortable width="90"></el-table-column>
                  <el-table-column prop="detail.pm25" label="PM2.5" sortable width="90"></el-table-column>
                  <el-table-column prop="detail.pm10" label="PM10" sortable width="90"></el-table-column>
                  <el-table-column prop="detail.tvoc" label="TVOC" sortable min-width="90"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <h1 style="border-bottom: 3px solid #e4e7ed;margin-top:20px">库房示意图</h1>
        <div
          class="foo-show"
          :style="{
            backgroundImage: 'url(' + item.url + ')',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }"
        >
          <el-popover
            v-for="(item1, index) in item.infoList"
            :key="index"
            placement="right"
            width="200"
            trigger="click"
          >
            <!-- 假数据 -->
            <p>温度: {{ item1.detail.temp }}</p>
            <p>湿度: {{ item1.detail.humi }}</p>
            <p>PM2.5: {{ item1.detail.pm25 }}</p>
            <p>PM10: {{ item1.detail.pm10 }}</p>
            <div
              slot="reference"
              class="foo-show-item"
              :style="{ left: item1.left + 'px', top: item1.top + 'px' }"
            >
              <el-badge :is-dot="item1.isDot">
                <div class="set-header">user</div>
              </el-badge>
              <span>{{ item1.title }}</span>
            </div>
          </el-popover>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStorageInfo } from '@/api/index'
import TempChart from '@/components/Charts/tempChart.vue'
import HumiChart from '@/components/Charts/humiChart.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import BreadCrumb from '@/components/breadCrumb.vue'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'monit',
  components: {
    TempChart,
    HumiChart,
    LineChart,
    BreadCrumb
  },
  data() {
    return {
      //假
      intercalate: [
        {
          name: '库房一',
          url: require('../../assets/Model-1.png'),
          id: '1',
          infoList: [
            {
              title: '数据一',
              left: 224,
              top: 281,
              id: 1,
              isDot: true,
              detail: {
                date: '2016-05-02',
                temp: 23,
                humi: 34,
                pm25: 9,
                pm10: 12,
                tvoc: 0.2
              }
            },
            {
              title: '数据二',
              left: 200,
              top: 52,
              id: 1,
              isDot: false,
              detail: {
                date: '2016-05-02',
                temp: 54,
                humi: 34,
                pm25: 9,
                pm10: 12,
                tvoc: 0.2
              }
            }
          ]
        },
        {
          name: '库房二',
          url: require('../../assets/Model-2.png'),
          id: '2',
          infoList: [
            {
              title: '数据一',
              left: 47,
              top: 89,
              id: 1,
              detail: {
                date: '2016-05-02',
                temp: 67,
                humi: 86,
                pm25: 9,
                pm10: 12,
                tvoc: 0.2
              }
            },
            {
              title: '数据二',
              left: 332,
              top: 42,
              id: 1,
              detail: {
                date: '2016-05-02',
                temp: 31,
                humi: 85,
                pm25: 9,
                pm10: 12,
                tvoc: 0.2
              }
            }
          ]
        },
        {
          name: '库房三',
          url: require('../../assets/Model-3.png'),
          id: '3',
          infoList: [
            {
              title: '数据一',
              left: 580,
              top: 292,
              id: 1,
              detail: {
                date: '2016-05-02',
                temp: 34,
                humi: 54,
                pm25: 9,
                pm10: 12,
                tvoc: 0.2
              }
            }
          ]
        }
      ],
      value1: [],
      downloadLoading: false
    }
  },
  created() {
    // this.getStorageInfo()
  },
  methods: {
    // 获取库房信息
    getStorageInfo() {
      getStorageInfo().then(res => {
        console.log(res)
      })
    },
    //导出
    handleDownload() {
      this.downloadLoading = true
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          //设置导出文件名称
          'sheetexel.xlsx'
        )
        this.downloadLoading = false
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
        this.downloadLoading = false
      }
      return wbout
    },
    //点击确定触发
    handleDateFilter() {
      let [dateStart, dateEnd] = this.value1
      console.log(Date.parse(dateStart), Date.parse(dateEnd))
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-range-editor.el-input__inner {
  padding: 0;
  height: 28px;
  line-height: 28px;
  .el-range__icon {
    line-height: 26px;
    margin-left: 0;
  }
  .el-range__close-icon,
  .el-range-separator {
    line-height: 26px;
  }
}
/deep/.el-tabs__content {
  overflow: auto;
}
.foo {
  h1 {
    margin: 0;
    font-size: 34px;
    color: #409eff;
    text-align: center;
  }

  .foo-data {
    display: flex;
    width: 100%;
    justify-content: center;
    .foo-data-charts {
      width: 45%;
      height: 247px;
      .foo-data-piechart {
        display: flex;
        div {
          flex: 1;
        }
      }
    }
    .foo-data-linechart {
      width: 55%;
      height: 247px;
      /deep/.el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav {
        float: right;
      }
      /deep/.el-tabs__item {
        height: 22px;
        line-height: 22px;
      }
      /deep/.el-tabs--card {
        border: 1px solid #e4e7ed;
        border-top: none;
      }
      .foo-data-time {
        height: 28px;
        border: 1px solid #dcdfe6;
        border-bottom: none;
        padding-top: 10px;
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          padding: 0 8px;
        }
        .icon-style {
          font-size: 27px;
          border: 1px solid #dcdfe6;
          color: #606266;
          margin-left: 1px;
          border-radius: 2px;
          cursor: pointer;
        }
        .btn-style {
          margin: 0 8px;
        }
      }
      .el-tabs--card {
        height: 86%;
      }
    }
  }
  .foo-show {
    width: 1632px;
    height: 500px;
    margin: auto;
    position: relative;
    .foo-show-item {
      position: absolute;
      cursor: pointer;
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
    }
  }
}
</style>
