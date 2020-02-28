<template>
 <div class="app_content">
   <left-content></left-content>
   <middle-content></middle-content>
   <right-content></right-content>
 </div>
</template>

<script>
import leftContent from './left/index'
import middleContent from './middle/index'
import rightContent from './right/index'
 export default {
   // name: 'appContent',
   data () {
     return {

     }
   },
   components: {
     leftContent,
     middleContent,
     rightContent
   }
 }
</script>

<style>
.app_content{
  width: 100%;
  height: 99%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  position: relative;
  text-align: center
}
</style>
