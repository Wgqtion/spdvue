<template>
  <div class="right_bottom">
    <div ref="echartsCon" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
  import {postJsonRequest} from '../../../utils/api'
  export default {
    name: 'rightBottom',
    data () {
      return {
        monthYear:[],
        chart: null
      }
    },
    mounted() {

      postJsonRequest('/home/warnDateSelect',
        {thisMonth:7,thisYear:2019}
      ).then(res=>{
        if (res.status == 200) {

        }
      })

      function setMonth (res) {
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
      }


      this.chart = this.$echarts.init(this.$refs.echartsCon)
      var echarts = this.$echarts;
      var layouts = [
        [[0, 0]],
        [[-0.25, 0], [0.25, 0]],
        [[0, -0.2], [-0.2, 0.2], [0.2, 0.2]],
        [[-0.25, -0.25], [-0.25, 0.25], [0.25, -0.25], [0.25, 0.25]]
      ];
      var pathes = [
        'M488.2 959.6c-2.1 0-4.1-0.2-6.2-0.7-13.1-3-22.2-14.8-21.8-28.2l10.6-335.6H326.7c-9.6 0-18.5-4.9-23.7-13-5.1-8.1-5.7-18.3-1.6-27L527.5 79.8c6-12.5 20.2-18.7 33.4-14.8 13.3 4 21.6 17.1 19.6 30.8l-48.4 332.5h165c9.5 0 18.3 4.8 23.4 12.7 5.2 7.9 6 17.9 2.2 26.6L513.8 942.8c-4.5 10.4-14.7 16.8-25.6 16.8zM371 539.1h128.7c7.6 0 14.8 3.1 20.1 8.5 5.3 5.4 8.1 12.8 7.9 20.4l-7 220 133.4-303.6H499.7c-8.1 0-15.9-3.5-21.2-9.7-5.3-6.2-7.7-14.3-6.5-22.3l26.3-180.9L371 539.1z',
        'M906.752 230.912A212.992 212.992 0 0 1 862.208 460.8a200.704 200.704 0 0 1-245.248 33.28L563.2 555.52l40.448 41.472 24.064-24.576a31.744 31.744 0 0 1 44.544 0l195.072 201.728a32.768 32.768 0 0 1 0 45.568l-89.088 91.136a31.744 31.744 0 0 1-44.544 0l-195.584-201.728a32.768 32.768 0 0 1 0-45.568l22.016-22.528-38.4-39.424-272.384 301.568a61.952 61.952 0 0 1-89.6 0l-22.016-22.528a65.536 65.536 0 0 1 0-91.136l307.2-263.168-204.8-209.408H176.64L102.4 194.048l59.392-61.952 122.88 77.312v64.512l204.8 211.968 59.904-51.2a211.968 211.968 0 0 1 19.968-271.36 201.728 201.728 0 0 1 222.208-45.568l-129.024 133.12 111.104 113.664zM211.456 821.76a30.72 30.72 0 0 0-44.544 0 32.768 32.768 0 0 0 0 45.568 31.744 31.744 0 1 0 44.544-45.568z',
        'M 882.176 770.048 c -0.512 -1.024 -0.512 -2.048 -1.024 -3.072 L 556.544 205.312 c 0 -0.512 -0.512 -0.512 -0.512 -1.024 c -0.512 -1.024 -16.384 -23.04 -43.008 -23.04 c -26.112 0 -44.032 20.992 -44.544 22.016 c -0.512 0.512 -1.024 1.024 -1.024 1.536 l -322.56 559.104 c -0.512 0.512 -0.512 1.024 -1.024 2.048 c -1.024 3.072 -9.728 29.696 3.072 50.176 c 12.8 20.992 39.936 26.112 43.008 26.624 h 640 c 1.024 0 29.184 -2.56 44.544 -23.04 c 15.36 -20.48 8.192 -48.128 7.68 -49.664 Z M 485.888 387.072 c 0 -14.336 11.776 -26.112 26.112 -26.112 s 26.112 11.776 26.112 26.112 v 216.576 c 0 14.336 -11.776 26.112 -26.112 26.112 s -26.112 -11.776 -26.112 -26.112 V 387.072 Z M 512 757.248 c -23.04 0 -41.984 -18.944 -41.984 -41.984 S 488.96 673.28 512 673.28 s 41.984 18.944 41.984 41.984 S 535.04 757.248 512 757.248 Z',
        'M512 960c70.4 0 128-57.6 128-128H384c0 70.4 57.6 128 128 128z m320-384V448c0-153.6-108.8-281.6-256-313.6V128c0-38.4-25.6-64-64-64s-64 25.6-64 64v6.4C300.8 166.4 192 294.4 192 448v128l-128 128v64h896v-64l-128-128z'
      ];
      var colors = [
        '#5ccccc',
        '#ffffff',
        '#FF0000',
        '#FFC600'
      ];

      function getVirtulData(year) {
        year = year || '2019';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          var items = [];
          // TODO 随机数（后期需要接受后台数据显示日历显示事件）
          var eventCount = Math.round(Math.random());
          for (var i = 0; i < eventCount; i++) {
            items.push(Math.round(Math.random() * (pathes.length - 1)));
          }
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            items.join('|')
          ]);
        }
        // console.log("假日历数据"+JSON.stringify(data))
        return data;
      }
      function renderItem(params, api) {
        var cellPoint = api.coord(api.value(0));
        var cellWidth = params.coordSys.cellWidth;
        var cellHeight = params.coordSys.cellHeight;
        // console.log(JSON.stringify(api.value(0)))
        var value = api.value(1);
        var events = value && value.split('|');

        if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
          return;
        }

        var group = {
          type: 'group',
          children: echarts.util.map(layouts[events.length - 1], function (itemLayout, index) {
            return {
              type: 'path',
              shape: {
                pathData: pathes[events[index]],
                x: -8,
                y: -8,
                width: 16,
                height: 16
              },
              position: [
                cellPoint[0] + echarts.number.linearMap(itemLayout[0], [-0.5, 0.5], [-cellWidth / 2, cellWidth / 2]),
                cellPoint[1] + echarts.number.linearMap(itemLayout[1], [-0.5, 0.5], [-cellHeight / 2 + 20, cellHeight / 2])
              ],
              style: api.style({
                fill: colors[events[index]]
              })
            };
          }) || []
        };

        group.children.push({
          type: 'text',
          style: {
            x: cellPoint[0],
            y: cellPoint[1] - cellHeight / 2 + 15,
            text: echarts.format.formatTime('dd', api.value(0)),
            fill: '#ffaa00',
            textFont: api.font({fontSize: 14})
          }
        });

        return group;
      }
      this.chart.setOption({
        tooltip: {
        },
        // visualMap:{
        //   show: false,
        //   min: 0,
        //   max: 300,
        //   calculable: true,
        //   seriesIndex: [2],
        //   orient: 'horizontal',
        //   left: 'center',
        //   bottom: 200,
        //   borderWidth:5,
        //   backgroundColor:"#0000ff",
        // },
        calendar: [{
          left: 'center',
          top: 'middle',
          left:'30',
          right:'30',
          cellSize: ['auto', 70],
          orient: 'vertical',
          yearLabel: {
            margin: 60
          },
          itemStyle: {
            normal: {
              color: 'rgba(26,81,255,0)',
            }
          },
          dayLabel: {
            firstDay: 1,
            //表头周颜色
            color:'#ffffff',
            nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          },
          monthLabel: {
            show: false
          },
          range: '2019-07'
        }],
        series: [{
          type: 'custom',
          coordinateSystem: 'calendar',
          // 图形渲染的逻辑
          renderItem: renderItem,
          dimensions: [null, {type: 'ordinal'}],
          data: getVirtulData(2019)
        }]})
    },
    components: {

    }
  }
</script>

<style lang='less'>
  .right_bottom{
    height: 100%;
    width: 100%;
    // border: 1px solid black;
  }
</style>
