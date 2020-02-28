<template>
  <div class="dialog-msg">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple-white">
        <h3 class="myh3">L1</h3>
        <h5 class="myh5">漏电流(S)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.silcL1}}</div>
        <h5 class="myh5">雷击幅值(A)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningAmplitudeL1}}</div>
        <h5 class="myh5">浪涌计数(C)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningCountL1}}</div>
        <h5 class="myh5">寿命评估(L)</h5>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="message.equipmentEvent.lifeTermL1" :status="getLifeTermL1()"></el-progress>
        <h5 class="myh5">最近上报时间</h5>
        {{message.equipmentEvent.updateTime}}
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-white">
        <h3 class="myh3">L2</h3>
        <h5 class="myh5">漏电流(S)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.silcL2}}</div>
        <h5 class="myh5">雷击幅值(A)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningAmplitudeL2}}</div>
        <h5 class="myh5">浪涌计数(C)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningCountL2}}</div>
        <h5 class="myh5">寿命评估(L)</h5>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="message.equipmentEvent.lifeTermL2" :status="getLifeTermL2()"></el-progress>
        <h5 class="myh5">最近上报时间</h5>
        {{message.equipmentEvent.updateTime}}
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-white">
        <h3 class="myh3">L3</h3>
        <h5 class="myh5">漏电流(S)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.silcL3}}</div>
        <h5 class="myh5">雷击幅值(A)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningAmplitudeL3}}</div>
        <h5 class="myh5">浪涌计数(C)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningCountL3}}</div>
        <h5 class="myh5">寿命评估(L)</h5>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="message.equipmentEvent.lifeTermL3" :status="getLifeTermL3()"></el-progress>
        <h5 class="myh5">最近上报时间</h5>
        {{message.equipmentEvent.updateTime}}
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-white">
        <h3 class="myh3">N</h3>
        <h5 class="myh5">漏电流(S)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.silcL4}}</div>
        <h5 class="myh5">雷击幅值(A)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningAmplitudeL4}}</div>
        <h5 class="myh5">浪涌计数(C)</h5>
        <div style="text-align:center;background: black;color: white">{{message.equipmentEvent.lightningCountL4}}</div>
        <h5 class="myh5">寿命评估(L)</h5>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="message.equipmentEvent.lifeTermL4" :status="getLifeTermL4()"></el-progress>
        <h5 class="myh5">最近上报时间</h5>
        {{message.equipmentEvent.updateTime}}
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'dialogMsg',
    props:["message"],
    methods: {

      getLifeTermL1(){
        if(this.message.equipmentEvent.lifeTermL1 == 0){
          return "exception"
        } else if(this.message.equipmentEvent.lifeTermL1 > this.message.version.lifeThreshold){
          return "success"
        }else if(this.message.equipmentEvent.lifeTermL1 < this.message.version.lifeThreshold){
          return "warning"
        }
      },
      getLifeTermL2(){
        if(this.message.equipmentEvent.lifeTermL2 == 0){
          return "exception"
        } else if(this.message.equipmentEvent.lifeTermL2 > this.message.version.lifeThreshold){
          return "success"
        }else if(this.message.equipmentEvent.lifeTermL2 < this.message.version.lifeThreshold){
          return "warning"
        }
      },
      getLifeTermL3(){
        if(this.message.equipmentEvent.lifeTermL3 == 0){
          return "exception"
        } else if(this.message.equipmentEvent.lifeTermL3 > this.message.version.lifeThreshold){
          return "success"
        }else if(this.message.equipmentEvent.lifeTermL3 < this.message.version.lifeThreshold){
          return "warning"
        }
      },
      getLifeTermL4(){
        if(this.message.equipmentEvent.lifeTermL4 == 0){
          return "exception"
        } else if(this.message.equipmentEvent.lifeTermL4 > this.message.version.lifeThreshold){
          return "success"
        }else if(this.message.equipmentEvent.lifeTermL4 < this.message.version.lifeThreshold){
          return "warning"
        }
      },

    },
    data(){
      return{
        eqstatus:"success",
        lifeTermL1:0,
        lifeTermL2:0,
        lifeTermL3:0,
        lifeTermL4:0,
        lifeStatusL1:"success",
        lifeStatusL2:"success",
        lifeStatusL3:"success",
        lifeStatusL4:"success",
      }
    }
  }
</script>

<style scoped>
  .circle{
    text-align:center;
    margin:15px auto;
    line-height: 40px;
    width: 40px;
    height: 40px;
    background-color: orangered;
    border-radius: 50%;
  }
  .myh3{
    text-align:center;
    margin-block-start:0
  }
  .myh5{
    margin-block-end:0.3em
  }
</style>
<style>
  .dialog-msg {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .grid-content {
    border-radius: 4px;
    height: 300px;
    justify-content: center;
  }
  .bg-purple-white {
    background: white;
  }
</style>
