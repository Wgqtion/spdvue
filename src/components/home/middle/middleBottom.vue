<template>
 <div class="middle_bottom">
  <div ref="echartsCon" id="echartsContainer" style="width: 100%; height: 100%"></div>
 </div>
</template>

<script>
 export default {
   name: 'middleBottom',
   data () {
     return {
       chart: null
     }
   },
   mounted() {
     this.chart = this.$echarts.init(this.$refs.echartsCon)

     this.chart.setOption({
        grid:{
            top: 20,
            width: '80%'
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月'],
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
        series: [{
            data: [0, 1, 3, 1, 15, 20],
            type: 'line'
        }]
     })
   },
   components: {

   }
 }
</script>

<style lang='less'>
.middle_bottom{
  height: 100%;
  width: 100%;
  // border: 1px solid black;
}
</style>
