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
    data () {
      return {

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
