<template>
  <div class="app_header">
    <div class="bg_header">
      <div class="t_title">
        SPD浪涌在线监测管理平台
      </div>
      <div class="menu_header">
        <el-menu :default-active="activeIndex" class="el-menu--horizontal" mode="horizontal" text-color="#fff"
                 active-text-color="#409EFF" @select="handleClick">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">设备信息</template>
            <el-menu-item index="2-1">浪涌基本信息</el-menu-item>
            <el-menu-item index="2-2">浪涌设备状态</el-menu-item>
            <el-menu-item index="2-3">网关信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">设备维护</template>
            <el-menu-item index="3-1">故障及维护</el-menu-item>
            <el-menu-item index="3-2">维护记录</el-menu-item>
            <el-menu-item index="3-3">所属片区</el-menu-item>
            <el-menu-item index="3-4">设备型号</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">系统设置</template>
            <el-menu-item index="4-1">用户管理</el-menu-item>
            <el-menu-item index="4-2">关于</el-menu-item>
          </el-submenu>
          <el-menu-item index="5">欢迎,{{name}}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <el-dialog
      width="30%"
      :title="dialoganme"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      v-if='dialogVisible'>
      <iesAbout></iesAbout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import iesAbout from './IESAbout'
  export default {
    name: 'appHeader',
    data () {
      return {
        name:null,
        activeIndex: '1',
        visible: false,
        activeName: 'first',
        dialogVisible:false
      }
    },
    // 路由监听
    watch: {
      $route (to, from) {
        // console.log(to.path)
        if (to.path == ('/index/equipment_event')) {
          this.activeIndex = '2'
        }
        else if (to.path == ('/index/home')) {
          this.activeIndex = '1'
        }else if (to.path == ('/index/ee_grid_table')) {
          this.activeIndex = '2-2'
        }else if (to.path == ('/index/ee_rule_table')) {
          this.activeIndex = '2-1'
        }else if (to.path == ('/index/gateway')) {
          this.activeIndex = '2-3'
        }else if (to.path == ('/index/equipment_fault')) {
          this.activeIndex = '3-1'
        }else if (to.path == ('/index/equipment_maint')) {
          this.activeIndex = '3-2'
        }else if (to.path == ('/index/area_setting')) {
          this.activeIndex = '3-3'
        }else if (to.path == ('/index/version_setting')) {
          this.activeIndex = '3-4'
        }else if (to.path == ('/index/user')) {
          this.activeIndex = '4-1'
        }

      }
    },

    methods: {
      newcreated(){
        this.name = localStorage.getItem("name")
        // console.log(this.name)
        if(!this.name){
          this.$router.push({name: 'login'})
        }
      },
      handleClick (index, indexPath) {
        console.log(index, indexPath)
        if (index == 1) {
          this.$router.replace({path: '/index/home'})
        }
        else if (index == '2-1') {
          this.$router.replace({path: '/index/ee_rule_table'})
        }
        else if (index == '2-2') {
          this.$router.replace({path: '/index/ee_grid_table'})
        }
        else if (index == '2-3') {
          this.$router.replace({path: '/index/gateway'})
        }
        else if (index == '3-1') {
          this.$router.replace({path: '/index/equipment_fault'})
        }
        else if (index == '3-2') {
          this.$router.replace({path: '/index/equipment_maint'})
        }
        else if (index == '3-3') {
          this.$router.replace({path: '/index/area_setting'})
        }
        else if (index == '3-4') {
          this.$router.replace({path: '/index/version_setting'})
        }else if (index == '4-1') {
          this.$router.replace({path: '/index/user'})
        }else if (index == '4-2') {
          this.dialogVisible = true
        }else if (index == '5') {
          this.$confirm('退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            localStorage.clear()
            this.$router.replace({path: '/login'})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '退出登录已取消'
            });
          });
        }
      },
      cancel: function () {
        this.$router.go(-1)
      }

    },
    mounted () {
      this.newcreated()
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.cancel, false)
      }
    },
    components: {
      iesAbout
    }
  }
</script>
<style lang="less">
  /*解决动态触发局部不生效问题*/
  .el-menu--horizontal {
    .el-menu {
      border-right: solid 1px #e6e6e6;
      list-style: none;
      position: relative;
      margin: 0;
      padding-left: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .el-submenu__title {
      height: 100% !important;
      font-size: 14px !important;
      background-color: rgba(0, 0, 0, 0) !important;
    }
    .el-submenu.el-submenu__title:hover {
      height: 100% !important;
      font-size: 14px !important;
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
</style>

<style lang="less" scoped>
  .app_header {
    width: 100%;
    height: 60px;
    position: relative;
    padding: 0 20px;
    .bg_header {
      width: 100%;
      height: 40px;
      background: url(../assets/img/title.png) no-repeat;
      background-size: 100% 100%;
      .t_title {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2.5em;
        line-height: 45px;
        color: #fff;
        text-shadow: 0px 0px 13px rgb(0, 238, 238);
      }
      .menu_header {
        margin-top: -25px;
        float: right;
        width: 30%;
        right: 20px;
      }
    }
  }

  .el-menu--horizontal {
    .el-submenu__title:hover {
      color: #409EFF !important;
      background-color: rgba(84, 92, 100, 0) !important;
    }
    margin-top: -15px;
    background-color: rgba(84, 92, 100, 0) !important;
    .el-submenu {
      text-color: #ffffff;
      height: 45px;
      font-size: 14px;
      background-color: rgba(84, 92, 100, 0) !important;

    }
    .el-submenu:hover {
      text-color: #ffffff;
      height: 45px;
      font-size: 14px;
      background-color: rgba(84, 92, 100, 0) !important;
    }
    .el-submenu__title {
      color: #ffffff;
      height: 100%;
      font-size: 14px;
      background-color: rgba(84, 92, 100, 0) !important;
    }
    .el-submenu__title.is-active {
      color: #409EFF !important;
      background: rgba(84, 92, 100, 0) !important;
    }

    .el-menu-item {
      color: #ffffff;
      height: 45px;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0) !important;
    }
    .el-menu-item.is-active {
      color: #409EFF !important;
      background: rgba(0, 0, 0, 0) !important;
    }
    .el-menu-item:hover {
      color: #409EFF !important;
      background-color: rgba(0, 0, 0, 0) !important;
    }
    .el_menu:hover {
      background: rgba(0, 0, 0, 0);
    }
  }

  /*.el-menu--horizontal.el-submenu.el-menu-item{*/
  /*color: #ffffff;*/
  /*height: 45px;*/
  /*font-size: 14px;*/
  /*background-color: rgba(0, 0, 0, 0) !important;*/
  /*}*/
</style>

