<template>
  <div class="eq-data-box">
    <el-carousel class="carousel-box" :autoplay="false" indicator-position="outside" arrow="never">
      <el-carousel-item class="carousel-box" v-for="item in items" :key="item">
        <ruleTable v-if="item"></ruleTable>
        <gridTable v-if="!item"></gridTable>
      </el-carousel-item>
    </el-carousel>
    <div class="clearfloat"></div>
  </div>

</template>

<script>

  import ruleTable from './EERuleTable'
  import gridTable from './EEGridTable'
  export default {
    name: 'middleContent',
    data () {
      return {
        isCollapse: true,
        items:[
          true,
          false
        ]
      }
    },
    components: {
      ruleTable,
      gridTable
    }
  }
</script>

<style>
  .el-carousel__container{
    height: 96%;
  }
  .carousel-box{
    height: 100%;
  }

  .eq-data-box{
    background-color: rgba(0,0,0,0);
    height: 91%;
    /*max-height: 91%;*/
  }
  .clearfloat{clear:both;height:0;font-size:1px;line-height:0px;}
</style>
