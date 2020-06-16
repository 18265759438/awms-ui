<template>
  <div ref="pie" style="width: 300px;height: 247px;"></div>
</template>

<script>
export default {
  name: 'piechart',
  props: ['dataProp'],
  created() {
    let humi = [this.dataProp.map(item => item.detail.humi)]
    this.option.series[0].data = humi
  },
  data() {
    return {
      option: {
        series: [
          {
            name: '湿度',
            type: 'gauge',
            detail: {
              formatter: '湿度{value}℃',
              fontSize: 13,
              offsetCenter: [0, '75%']
            },
            pointer: {
              //指针
              show: true,
              length: '100%',
              width: 6
            },
            axisLine: {
              //刻度线
              lineStyle: {
                color: [
                  [0.6, '#38f'],
                  [1, '#FF0000']
                ],
                width: 18
              }
            },
            itemStyle: {
              //指针颜色
              color: '#FF0000'
            },
            data: []
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
      // 初始化
      let pieChart = this.$echarts.init(this.$refs.pie)
      pieChart.setOption(this.option)
    }
  }
}
</script>
