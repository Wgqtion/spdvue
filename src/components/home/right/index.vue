<template>
 <div class="right_content">
   <databox :title="''" :dheight="100">
     <databox :title="'设备状态统计图'" :dheight="40" :boxb="false">
      <right-top></right-top>
     </databox>
     <databox :title="'日志记录'" :dheight="60" :boxb="false">
       <right-bottom></right-bottom>
     </databox>
   </databox>

 </div>
</template>

<script>
import rightTop from './rightTop'
import rightBottom from './rightBottom'
// import leftBottom from '../left/leftBottom'
 export default {
   components: {
     rightTop,
     rightBottom,
     // leftBottom
   },
   data () {
     return {

     }
   }
 }
</script>

<style lang='less'>
.right_content{
  height: 100%;
  width: 25%;
  // border: 1px solid black;
}

</style>
