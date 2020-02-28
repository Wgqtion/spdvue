<template>
  <div class="left_top">
    <div ref="echartsCon" id="echartsContainer" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
  import {postJsonRequest} from '../../../utils/api'
  export default {
    name: 'leftTop',
    // 自定义函数
    methods:{
      jumpRouter (areaname) {
        this.$router.push({name: '浪涌基本信息', params: {name: 'version', value: areaname}})
      },
      // 数据处理;柱状图加载坐标显示类型
      convertVNumber(data){
        var res = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].id) {
            res.push({
              id:data[i].id,
              // name: data[i].versionNo,
              value: data[i].eqCount
            })
          }
        }
        // console.log(JSON.stringify(res))
        return res
      },
      // 数据处理;柱状图加载数据
      convertVName(data){
        var res = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].id) {
            res.push(data[i].versionNo)
          }
        }
        return res
      }
    },
    data () {
      return {
        vName:[],
        vNumber:[],
        chart: null
      }
    },
    mounted () {
      var _this = this
      this.chart = this.$echarts.init(this.$refs.echartsCon)

      postJsonRequest('/home/versionCount').then(res=>{
        if (res.status == 200) {
          this.vName = this.convertVName(res.data)
          this.vNumber = this.convertVNumber(res.data)
          // 绘制柱状图
          this.chart.setOption({
            title: {
              textStyle: {
                color: '#ffffff',
                fontSize: 15
              }
            },
            grid: {
              top: 30
            },
            xAxis: {
              data: this.vName,
              axisLine: {
                lineStyle: {
                  color: '#ffffff'
                }
              }
            },
            yAxis: {
              axisLine: {
                lineStyle: {
                  color: '#ffffff'
                }
              }
            },
            tooltip:{
            },
            series: [{
              name: '数量',
              type: 'bar',
              data: this.vNumber,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0.5, color: '#FF5722'},
                    ]
                  )
                },
                emphasis: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#E64A19'},
                      {offset: 0.7, color: '#FF8A65'},
                      {offset: 1, color: '#FF5722'}
                    ]
                  )
                }
              },
            }]
          })
        }
      })

      this.chart.on('click',function (pram) {
        console.log(pram)
        _this.jumpRouter(pram.data.id)
      })
    },
    components: {}
  }
</script>

<style lang="less">
  .left_top {
    height: 100%;
    width: 100%;
    // border: 1px solid black;
  }
</style>

