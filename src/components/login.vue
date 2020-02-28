<template>
  <div style="width: 100%;height: 978px;" class="Login">
    <div >
      <div class="Login_heand dk">
        <a class="Login_logo fl">
          <img src="./../../static/img/logo.png" style="width: 200px;height: 150px" class="fl"><br/>
          <p style="font-size: 80px" class="fl">SPD浪涌在线监测管理平台</p>
          <div class="clear"></div>
        </a>
        <div class="clear"></div>
      </div>
      <div class="Login_k">
        <div class="Login_T">密码登录<p></p></div>
        <!--登录-开始-->
        <form class="Login_dl">
          <div class="Login_row">
            <input name="zhanghao" type="text" v-model="loginName" class="Login_input Login_inp1" placeholder="用户名">
          </div>
          <div class="Login_row">
            <input name="password" autocomplete="off" type="password" v-model="password" class="Login_input Login_inp2" placeholder="密码">
          </div>
          <a class="Login_dla" @click="loginsub()">登录</a>
          <label class="Login_pitch fl">
            <input type="checkbox" name="checkbox01" class=" fl">
            <div class="fl">自动登录</div>
            <div class="clear"></div>
          </label>
          <div class="Login_wj fr">
            <a href="/#/login">忘记密码</a>
          </div>
          <div class="clear"></div>

        </form>
        <!--登录-结束-->
      </div>
    </div>
    <mytexter style="z-index: -1"></mytexter>
  </div>
</template>

<script>
  import {postJsonRequest} from '../utils/api'
  import mytexter from './texter'

  export default {
    name: 'login',
    components: {
      mytexter
    },
    methods: {
      loginsub () {
        if (this.loginName && this.password) {
          postJsonRequest('/user/login', {loginName: this.loginName, password: this.password}).then(res => {
            if (res.status == 200) {
              console.log(res.data)
              this.loginName = res.data.loginName
              this.name = res.data.name
              this.userId = res.data.id
              this.level = res.data.level
              if(this.loginName){
                localStorage.setItem('loginName', this.loginName)
                localStorage.setItem('userId', this.userId)
                localStorage.setItem('level', this.level)
                localStorage.setItem('name', this.name)
                console.log(this.loginName,this.userId,this.level,this.name)
                this.$router.push({name: 'home'})
                // 绘制柱状图
              } else {
                this.$notify.error({
                  title: '登录失败',
                  message: '检查用户名密码是否正确'
                });
              }
            }
          })
        }
      }
    },
    data () {
      return {
        userId:null,
        level:null,
        name: null,
        password: null,
        loginName:null
      }
    }
  }
</script>
<style scoped src="../../static/css/loginstyle.css">

</style>
