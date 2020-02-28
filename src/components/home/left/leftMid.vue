<template>
  <div class="left_mid">
    <div ref="echartsCon" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
  import {postJsonRequest} from '../../../utils/api'

  export default {
    name: 'leftMid',
    methods: {
      jumpRouter (areaname) {
        this.$router.push({name: '浪涌基本信息', params: {name: 'areaCount', value: areaname}})
      },
      // 数据处理饼图数据
      convertData (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].name) {
            res.push({
              id: data[i].id,
              name: data[i].name,
              value: data[i].rootCount,
              code: data[i].code
            })
          }
        }
        return res
      },
      // 数据处理提示数据
      convertData2 (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].name) {
            res.push(data[i].name)
          }
        }
        return res
      }
    },
    data () {
      return {
        headArea: [],
        area: [],
        areacount: [],
        chart: null
      }
    },
    mounted () {
      var _this = this
      this.chart = this.$echarts.init(this.$refs.echartsCon)
      postJsonRequest('/home/areaCount').then(res => {
        if (res.status == 200) {
          // console.log("后端返回片区计数值："+JSON.stringify(res.data))
          this.area = this.convertData(res.data)
          this.headArea = this.convertData2(res.data)
          // console.log(JSON.stringify(this.headArea))
          this.chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              textStyle: {
                color: '#ffffff',
                fontSize: 10
              },
              data: this.headArea
            },
            series: [
              {
                name: '设备数量',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                itemStyle: {
                  color: function (params) {

                    // build a color map as your need.

                    var colorList = [
                      '#A65100',
                      '#9240D5',
                      '#04859D',
                      '#FE8463',
                      '#60C0DD',
                      '#DB37bC',
                      '#86B32D',
                    ]

                    return colorList[params.dataIndex]

                  },
                },
                data: _this.area
              }
            ]
          })
        }
      })
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          textStyle: {
            color: '#ffffff',
            fontSize: 10
          },
          data: ['一号园区', '二号园区', '三号园区', '四号园区', '五号园区']
        },
        series: [
          {
            name: '设备数量',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              color: function (params) {

                // build a color map as your need.

                var colorList = [
                  '#FE8463',
                  '#9BCA63',
                  '#FAD860',
                  '#F3A43B',
                  '#60C0DD',
                  '#D7504B',
                  '#C6E579',
                  '#F4E001',
                  '#F0805A',
                  '#26C0C0'

                ]

                return colorList[params.dataIndex]

              },
            },
            data: _this.area
          }
        ]
      }
      //饼图绘制
      // this.chart.setOption({
      //   tooltip: {
      //      trigger: 'item',
      //      formatter: "{a} <br/>{b}: {c} ({d}%)"
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     x: 'left',
      //     textStyle: {
      //       color: '#ffffff',
      //       fontSize: 10
      //     },
      //     data: ['一号园区','二号园区','三号园区','四号园区','五号园区']
      //   },
      //   series: [
      //     {
      //       name: '设备数量',
      //       type: 'pie',
      //       radius: ['50%', '70%'],
      //       avoidLabelOverlap: false,
      //       label: {
      //         normal: {
      //           show: false,
      //           position: 'center'
      //         },
      //         emphasis: {
      //           show: true,
      //           textStyle: {
      //             fontSize: '20',
      //             fontWeight: 'bold'
      //           }
      //         }
      //       },
      //       labelLine: {
      //         normal: {
      //           show: true
      //         }
      //       },
      //       itemStyle:{
      //         color: function(params) {
      //
      //           // build a color map as your need.
      //
      //           var colorList = [
      //             '#FE8463',
      //             '#9BCA63',
      //             '#FAD860',
      //             '#F3A43B',
      //             '#60C0DD',
      //             '#D7504B',
      //             '#C6E579',
      //             '#F4E001',
      //             '#F0805A',
      //             '#26C0C0'
      //
      //           ];
      //
      //           return colorList[params.dataIndex]
      //
      //         },
      //       },
      //       data: this.area
      //     }
      //   ]
      // })

      this.chart.on('click', function (pram) {
        console.log(pram)
        _this.jumpRouter(pram.data.code)
      })

    },
    components: {}
  }
</script>

<style lang='less'>
  .left_mid {
    height: 100%;
    width: 100%;
    // border: 1px solid black;
  }

</style>
