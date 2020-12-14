<template>
  <div class="middle_bottom">
    <div ref="echartsCon" id="echartsContainer" style="width: 100%; height: 90%"></div>
  </div>
</template>

<script>
// import VueNativeSock from 'vue-native-websocket'
import {getNotDataRequest} from '../../../utils/api'

export default {
  name: 'middleBottom',
  data () {
    return {
      chart: null,
      sumLightningCountList: [],
      datamonth: [],
      datacount: [],
    }
  },
  mounted () {
    this.refreshChart();
  },
  created: function () {
    this.initVue()
  },
  methods: {
    // 刷新表格
    refreshChart(){
      this.chart = this.$echarts.init(this.$refs.echartsCon)

      this.chart.setOption({
        grid: {
          top: 20,
          width: '80%'
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            console.log(pt)
            return [pt[0], '10%'];
          }
        },
        formatter: function (params) {

          console.log(params);
          return params[0].name + '<br />' + ('浪涌计数：'+params[0].value);
        },
        xAxis: {
          type: 'category',
          data: this.datamonth,
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        dataZoom: [{
          type: 'inside',
          start: 6/this.datacount.length*100,
          end: 100
        }, {
          start: 6/this.datacount.length*100,
          end: 100
        }],
        series: [{
          name:'浪涌计数',
          data: this.datacount,
          symbol: 'none',
          type: 'line',
        }]
      })
    },
    initVue () {

      let thisdate = new Date()
      // 当前月份
      const thismounth = thisdate.getMonth()
      // for (let i = -1; i < 5; i++) {
      //   this.datamonth.unshift(thismounth - i + '月')
      // }
      getNotDataRequest('spd/sumLightningCount').then(resp => {
        if (resp.status == 200) {
          this.sumLightningCountList = resp.data
          // for (let i = 0; i < 6; i++) {
            this.sumLightningCountList.forEach(item => {
              var mymonths = item.mymonth.split('-');
              this.datamonth.push(parseInt(mymonths[1])+'月');
              this.datacount.push({name:item.mymonth,value:item.sumlightning});
            })
          // }
          console.log(this.datamonth,this.datacount,resp.data)
          this.refreshChart();
        }
        // TODO 异常处理
        else {

        }
      })
    },
  },
  components: {}
}
</script>

<style lang='less'>
.middle_bottom {
  height: 100%;
  width: 100%;
  // border: 1px solid black;
}
</style>
