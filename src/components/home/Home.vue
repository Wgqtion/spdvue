<template>
  <div class="home">
    <app-content></app-content>
  </div>
</template>
<script>
  // import {getRequest} from '../utils/api'
  import appContent from './content'

  export default {
    name:'home',
    components: {
      appContent
    },
    methods:{
      add(){
        this.loginUser.id = parseInt(localStorage.getItem('userId'));
        this.$connect(`ws://localhost:9999/webSocketServer/`+this.loginUser.id);
        // this.$options.sockets.onmessage = (message) => {
        //   var jsonMsg = JSON.parse(message.data)
        //   console.log("websocket原始数据：",message)
        //   var data = jsonMsg.data
        //   switch (jsonMsg.msg) {
        //     case '1':
        //       // this.$socket.sendObj({ msg: '110' })
        //       break
        //     case '2':
        //       // this.$notify({
        //       //   message: data,
        //       //   duration: 3000
        //       // })
        //       // console.log(this.$store.state.socket)
        //       break
        //   }
        // }
      }
    },
    destroyed(){
      this.$disconnect();
    },
    created:function () {
      this.add();
    },
    data () {
      return {
        loginUser:{
        name:null,
          id:null
      }
      }
    }
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #447ED9;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    /*text-align: center;*/
  }

  .home_title {
    text-align: left;
    color: #fff;
    font-size: 14px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
  .home {
    margin: 0;
    width: 100%;
    height: -moz-calc(100% - 83px);
    height: -webkit-calc(100% - 83px);
    height: calc(100% - 83px);
  }

</style>
