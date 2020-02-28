<template>
 <div class="right_top">
   <div ref="echartsCon" style="width: 100%; height: 100%"></div>
 </div>
</template>

<script>
  import {postJsonRequest} from '../../../utils/api'
 export default {
   name: 'rightTop',
   data () {
     return {
       faultCount:{
         warnSize: 0,
         dangerSize: 0,
         goodSizw: 0
       },
       sumCount:0
     }
   },

   mounted() {
     this.chart = this.$echarts.init(this.$refs.echartsCon)
     var _this = this

     // 获取后台数据，并绘制图形
     postJsonRequest('/home/faultCount').then(res=>{
       if (res.status == 200) {
         this.faultCount = res.data
         this.sumCount = this.faultCount.dangerSize+this.faultCount.goodSizw+this.faultCount.warnSize
         // 数据与图形绑定
         this.chart.setOption({
           series: [
             {
               name: 'normal',
               type: 'pie',
               clockWise: false,
               radius: ['46%', '38%'],
               itemStyle: dataStyle,
               hoverAnimation: false,
               center: ['15%', '50%'],
               data: [{
                 value: this.faultCount.goodSizw,
                 label: {
                   normal: {
                     rich: {
                       a: {
                         color: '#80FF80',
                         align: 'center',
                         fontSize: 20,
                         fontWeight: "bold"
                       },
                       b: {
                         color: '#fff',
                         align: 'center',
                         fontSize: 14
                       }
                     },
                     formatter: function(params){
                       return "{b|在线}\n\n"+"{a|"+params.value+"个}";
                     },
                     position: 'center',
                     show: true,
                     textStyle: {
                       fontSize: '10',
                       fontWeight: 'normal',
                       color: '#fff'
                     }
                   }
                 },
                 itemStyle: {
                   normal: {
                     color: '#00CC00',
                     shadowColor: '#00CC00',
                     shadowBlur: 0
                   }
                 }
               }, {
                 value: this.sumCount-this.faultCount.goodSizw,
                 name: 'invisible',
                 itemStyle: {
                   normal: {
                     color: '#003d00'
                   },
                   emphasis: {
                     color: '#003d00'
                   }
                 }
               }]
             },
             {
               name: 'warning',
               type: 'pie',
               clockWise: false,
               radius: ['46%', '38%'],
               itemStyle: dataStyle,
               hoverAnimation: false,
               center: ['50%', '50%'],
               data: [{
                 value: this.faultCount.warnSize,
                 label: {
                   normal: {
                     rich: {
                       a: {
                         color: '#FFE773',
                         align: 'center',
                         fontSize: 20,
                         fontWeight: "bold"
                       },
                       b: {
                         color: '#fff',
                         align: 'center',
                         fontSize: 14
                       }
                     },
                     formatter: function(params){
                       return "{b|预警}\n\n"+"{a|"+params.value+"个}";
                     },
                     position: 'center',
                     show: true,
                     textStyle: {
                       fontSize: '10',
                       fontWeight: 'normal',
                       color: '#fff'
                     }
                   }
                 },
                 itemStyle: {
                   normal: {
                     color: '#FFB700',
                     shadowColor: '#FFB700',
                     shadowBlur: 0
                   }
                 }
               }, {
                 value: this.sumCount-this.faultCount.warnSize,
                 name: 'invisible',
                 itemStyle: {
                   normal: {
                     color:  '#4D3700'
                   },
                   emphasis: {
                     color: '#4D3700'
                   }
                 }
               }]
             },
             {
               name: 'danger',
               type: 'pie',
               clockWise: false,
               radius: ['46%', '38%'],
               itemStyle: dataStyle,
               hoverAnimation: false,
               center: ['85%', '50%'],
               data: [{
                 value: this.faultCount.dangerSize,
                 label: {
                   normal: {
                     rich: {
                       a: {
                         color: '#FF8080',
                         align: 'center',
                         fontSize: 20,
                         fontWeight: "bold"
                       },
                       b: {
                         color: '#fff',
                         align: 'center',
                         fontSize: 14
                       }
                     },
                     formatter: function(params){
                       return "{b|故障}\n\n"+"{a|"+params.value+"个}";
                     },
                     position: 'center',
                     show: true,
                     textStyle: {
                       fontSize: '10',
                       fontWeight: 'normal',
                       color: '#fff'
                     }
                   }
                 },
                 itemStyle: {
                   normal: {
                     color: '#FF0000',
                     shadowColor: '#FF0000',
                     shadowBlur: 0
                   }
                 }
               }, {
                 value: this.sumCount-this.faultCount.dangerSize,
                 name: 'invisible',
                 itemStyle: {
                   normal: {
                     color: '#4D0000'
                   },
                   emphasis: {
                     color: '#4D0000'
                   }
                 }
               }]
             }
           ]
         })
       }
     })

     // 饼状图点击事件
     this.chart.on('click',function (pram) {
       console.log(pram)
       _this.$router.push({name: '浪涌设备状态', params: {name: 'rightTop', value: [pram.seriesIndex]}})
     })
     var dataStyle = {
       normal: {
         label: {
           show: false
         },
         labelLine: {
           show: false
         },
         shadowBlur: 0,
         shadowColor: '#203665'
       }
     };
   },
   components: {
     // 'chart': ECharts
   }
 }
</script>

<style lang='less'>
.right_top{
  height: 80%;
  width: 100%;
}
</style>
