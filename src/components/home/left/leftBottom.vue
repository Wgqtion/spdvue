<template>
  <div class="left_bottom">
    <!--<svg-icon name="gateway" size="200" className='icon-danger'></svg-icon>-->
    <svg :class="['left_bottom',content? 'icon-success':'icon-danger']" @click="getstop">
      <use xlink:href="#icon-gateway"/>
    </svg>
    <!--<svg-icon icon-class="gateway">-->
    <!--&lt;!&ndash;<use xlink:href="#el_WYv_dpm7Y4_an_w3F1o8m9o"></use>&ndash;&gt;-->
    <!--</svg-icon>-->

  </div>
</template>

<script>
  import svgIcon from '../../svgIcon'
  import {getNotDataRequest} from '../../../utils/api'
  // import SvgIcon from '../../SvgIcon/SvgIcon'// svg component
  import '@/assets/svg/gateway.svg'
  import Snap from 'snapsvg'

  export default {
    name: 'leftBottom',
    data () {
      return {
        chart: null,
        content: null,
        online: false,
        anim:null,
        snapReturn:null
      }
    },
// 自定义函数
    methods: {
      // 点击事件
      getstop(){
        this.content = false;
        this.$router.push({name: '网关信息'})
      },
      // 获取设备信息事件
      getValue () {
        // 获取设备信息
        getNotDataRequest('/gateway/gatewayList').then(resp => {
          if (resp.status == 200) {
            this.loading = false;
            var s = Snap('#icon-gateway');
            var ongateway = s.select('#icon-gateway_el_eizYCb35lD');
            var outgateway = s.select('#icon-gateway_el_WYv_dpm7Y4');

            // 动画
            // var anim;
            this.content = this.isOnline(resp.data);
            // var snapReturn;
            if(this.anim){

            }else {
              // 动画入口
              this.anim = () => {
                this.snapReturn = Snap.animate(0, 100, (val) => {
                  let m = new Snap.Matrix();
                  m.rotate(-(val / 100) * 360, 512, 512);  // 旋转
                  outgateway.transform(m);  // 在outgateway节点应用matrix
                  let l = new Snap.Matrix();
                  l.scale(((val - 50) / 50), 1, 512, 512);  // 缩放
                  ongateway.transform(l);  // 在ongateway节点应用matrix
                }, 1500, () => {
                  if(this.content){
                    console.log(this.content)
                    this.anim();
                  }else{
                    return;
                  }
                });
                // console.log('xxx',this.snapReturn);
              }
            }

            if(this.content){
              this.anim();
            }else {
              // s.stop();
              // anim();
              // console.log('qqq',this.snapReturn);
              // this.snapReturn.stop();

            }

          }
          // TODO 异常处理
          else {

          }
        })
      },
      isOnline (data) {
        this.online = true;
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          if (!data[i].online && data[i].eqCount > 0) {
            this.online = false;

            return false;
          }
        }
        return true;
      }
    },
    beforeDestroy () {
      this.content = false;
      console.log('bbb',this.snapReturn);
    },
    created () {
      this.getValue();
    },
    components: {
      svgIcon
    }
  }
</script>

<style lang='less'>
  .left_bottom {
    height: 90%;
    width: 90%;
    // border: 1px solid black;
  }

  .icon-danger {
    --primary-color: #FF0000;
    --secondary-color: #FF7373;
    --primary-animation: icon-gateway;

  }

  .icon-success {
    --primary-color: #1195fe;
    --secondary-color: #aed7ff;
    --primary-animation: icon-gateway;

  }
</style>
