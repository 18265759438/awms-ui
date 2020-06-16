<template>
  <div ref="line" :style="{width: '765px', height: '180px'}"></div>
</template>

<script>
export default {
  name: 'linechart',
  props: ['dataProp'],
  created() {
    //传过来的日期
    var date = this.dataProp.map(item => item.detail.date)
    this.option.xAxis.data = date
  },
  data() {
    return {
      width: '765px',
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['温度', '湿度', 'PM2.5', 'PM10']
        },
        grid: {
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: null
        },
        yAxis: [
          {
            min: 0,
            max: 50,
            position: 'left',
            name: '温度',
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            min: 0,
            max: 100,
            position: 'right',
            name: '湿度',
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            yAxisIndex: '0',
            data: [11, 11, 15]
          },
          {
            name: '湿度',
            type: 'line',
            yAxisIndex: '1',
            data: [30, 20, 50]
          }
        ]
      }
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      //初始化
      let linechart = this.$echarts.init(this.$refs.line)
      linechart.setOption(this.option)
    }
  }
}
</script>

<style></style>
