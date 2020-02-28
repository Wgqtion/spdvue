<template>
 <div class="middle_content">
   <!-- <databox :title="'Mid_top'" :dheight="75" :boxb="false"> -->
     <middle-top></middle-top>
   <!-- </databox> -->

   <databox :title="''" :dheight="30" :boxb="true" >
     <databox :title="'浪涌统计图'" :dheight="100" :boxb="false">
       <middle-bottom></middle-bottom>
     </databox>
   </databox>
 </div>
</template>

<script>
import middleTop from './middleTop'
import middleBottom from './middleBottom'
 export default {
   name: 'middleContent',
   data () {
     return {

     }
   },
   components: {
     middleTop,
     middleBottom
   }
 }
</script>

<style lang='less'>
.middle_content{
  height: 100%;
  width: 50%;
  // border: 1px solid black;
}

</style>
