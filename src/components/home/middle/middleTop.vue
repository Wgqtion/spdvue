<template>
  <div class="middle_top">
    <el-container style="height: 100%"
                  v-loading="loading"
                  element-loading-background="rgba(0, 0, 0, 0)"
    >
      <div ref="echartsSol" id="echartsSolid" style="width: 100%; height: 100%"></div>
    </el-container>
  </div>
</template>

<script>
  import {postJsonRequest} from '../../../utils/api'
  import datas from '../../../assets/json/map.json'

  export default {
    name: 'middleTop',
    methods: {
      // 前段处理报警判断（废除）
      // areaForEach(array){
      //   // 第一层循环获取叶子结点片区要显示名称
      //   array.forEach(item=>{
      //     if(item){
      //       var artas={name:null,value:null};
      //       // console.log(JSON.stringify(item))
      //       artas.name = item.name
      //       if (item.equipmentList) {
      //         // console.log("第二层循环"+JSON.stringify(item.equipmentList))
      //         item.equipmentList.forEach(eq=>{
      //           // console.log("第二层循环参数"+JSON.stringify(eq.equipmentEvent.lifeTerm))
      //           // 剩余寿命大于阈值
      //           if(eq.equipmentEvent.lifeTerm < eq.version.lifeThreshold){
      //             artas.value = eq.equipmentEvent.lifeTerm
      //           }else if (eq.equipmentEvent.lifeTerm > eq.version.lifeThreshold) {
      //             artas.value = eq.equipmentEvent.lifeTerm
      //           }
      //         })
      //       }
      //       this.equipmentList.push(artas)
      //     }
      //   })
      // },
      jumpRouter (areaname) {
        // console.log(areaname)
        this.$router.push({name: '浪涌设备状态', params: {name: 'map', value: areaname}})
      }
    },
    data () {
      return {
        loading: false,
        lifeTerm: null,
        equipmentList: [],
        area: {},
        chart: null
      }
    },
    mounted () {
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // 加载动画
      // this.loading = true
      // 访问后台数据
      var _this = this
      this.loading = true
      postJsonRequest('/home/getMapValue').then(resp => {
        if (resp.status == 200) {
          // console.log("后端返回值："+JSON.stringify(resp))
          this.area = resp.data
          // this.areaForEach(resp.data)
          // console.log(JSON.stringify(this.equipmentList))
          // this.loading = false
          //  TODO （需后期美化代码）绘制地图，地图绘制要在参数接收之后
          // var geoCoordMap = {
          //   '同济大学': ['121.508513', '31.289086',]
          // }
          //数据处理(移交后台处理)
          // var convertData = function (data) {
          //   var res = []
          //   for (var i = 0; i < data.length; i++) {
          //     var geoCoord = geoCoordMap[data[i].name]
          //     if (geoCoord) {
          //       res.push({
          //         name: data[i].name,
          //         value: geoCoord.concat(data)
          //       })
          //     }
          //   }
          //   console.log(JSON.stringify(res))
          //   return res
          // }
          // console.log(datas)
          this.$echarts.registerMap('buildings', datas)
          var chart = this.$echarts.init(this.$refs.echartsSol)
          chart.setOption({
            geo: {
              map: 'buildings',
              // 放大级别
              zoom: 1,
              // 是否可放大缩小拖动
              roam: true,
              // 滚轮缩放的极限控制，通过min, max最小和最大的缩放值，默认的缩放为1。
              scaleLimit: {
                min: 0.2,
                max: 10
              },
              // label: {},
              itemStyle: {
                //图形颜色
                color: '#004981',
                // 描边线条颜色
                borderColor: '#029fd4',
                // 图形阴影的模糊大小。
                shadowBlur: 15,
                // 阴影颜色。
                shadowColor: '#029fd4',
                //描边线条粗细
                borderWidth: 1
              }
            },
            tooltip: {
              trigger: 'item',
              // formatter: function (params, ticket, callback) {
              //   // callback("啊大大大")
              //   var val = params.value
              //   return params.name + '</br>' + val[2] + '个'
              // }
            },
            series: [
              {
                name:'预警：',
                type:'scatter',
                coordinateSystem:'geo',
                data:this.area.warnList,
                encode:{
                  value:3
                },
                symbol:'path://M512 960c70.4 0 128-57.6 128-128H384c0 70.4 57.6 128 128 128z m320-384V448c0-153.6-108.8-281.6-256-313.6V128c0-38.4-25.6-64-64-64s-64 25.6-64 64v6.4C300.8 166.4 192 294.4 192 448v128l-128 128v64h896v-64l-128-128z',
                symbolSize:15,
                itemStyle:{
                  color:'#ffff00'
                }
              },
              {
                name: '损坏：',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.area.dangerList,
                //标点大小
                symbolSize: 20,
                showEffectOn: 'render',
                //鼠标经过动画
                hoverAnimation: true,
                encode: {
                  // 提示框显示数据
                  value: 3
                },
                // 标点动画样式
                rippleEffect: {
                  // 动画中波纹的最大缩放比例。
                  scale: 3,
                  // 波纹绘制方式，可选 'stroke' 和 'fill'。
                  brushType: 'stroke'
                },
                // 标点形状，不设置默认为圆形
                symbol: 'path://M 882.176 770.048 c -0.512 -1.024 -0.512 -2.048 -1.024 -3.072 L 556.544 205.312 c 0 -0.512 -0.512 -0.512 -0.512 -1.024 c -0.512 -1.024 -16.384 -23.04 -43.008 -23.04 c -26.112 0 -44.032 20.992 -44.544 22.016 c -0.512 0.512 -1.024 1.024 -1.024 1.536 l -322.56 559.104 c -0.512 0.512 -0.512 1.024 -1.024 2.048 c -1.024 3.072 -9.728 29.696 3.072 50.176 c 12.8 20.992 39.936 26.112 43.008 26.624 h 640 c 1.024 0 29.184 -2.56 44.544 -23.04 c 15.36 -20.48 8.192 -48.128 7.68 -49.664 Z M 485.888 387.072 c 0 -14.336 11.776 -26.112 26.112 -26.112 s 26.112 11.776 26.112 26.112 v 216.576 c 0 14.336 -11.776 26.112 -26.112 26.112 s -26.112 -11.776 -26.112 -26.112 V 387.072 Z M 512 757.248 c -23.04 0 -41.984 -18.944 -41.984 -41.984 S 488.96 673.28 512 673.28 s 41.984 18.944 41.984 41.984 S 535.04 757.248 512 757.248 Z',
                symbolRotate: 0,
                itemStyle: {
                  normal: {
                    // 标点颜色
                    color: '#ff0000'
                  }
                },
                // zlevel: 1
              }]
          })
          chart.on('click', function (params) {
            // TODO 地图事件处理
            console.log(params)

            if(params.name == "嘉定区"){
              _this.jumpRouter("005")
            }else if (params.name == "杨浦区"){
              _this.jumpRouter("006")
            } else if (params.name == "浦东新区"){
              _this.jumpRouter("007")
            } else if(params.value){
            _this.jumpRouter(params.value[2])
            }
            else {
              console.log("-----------------------------------------")
              _this.$confirm('该区域没有设备, 是否继续查询所有设备?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _this.jumpRouter('')
              }).catch(() => {
                _this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }

          })
        }
        // TODO 异常处理
        else {

        }

        // loading.close()
        this.loading = false
      })

    },
    components: {}
  }
</script>

<style lang='less'>
  .middle_top {
    position: relative;
    height: 70%;
    width: 100%;
  }

</style>
