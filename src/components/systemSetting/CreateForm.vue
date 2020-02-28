<template>
  <el-form ref="message" :model="message" label-width="80px">
    <el-input
      v-model="message.id"
      v-if="false">
    </el-input>
    <el-form-item label="用户名" prop="name">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.name">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="登录名" prop="loginName">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.loginName">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="账户等级" prop="level">
      <el-select class="myinput" v-model="message.level" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.text"
          :value="item.value"
          :disabled="item.value <= myLevel">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import {getNotDataRequest} from '../../utils/api'
  export default {
    name: 'CreateForm',
    props: ['message', 'value'],
    data () {
      return {
        myLevel:null,
        areaList:[],
        rules: {

        },
        options: [{
          value: 0,
          text: '管理员'
        }, {
          value: 1,
          text: '主管'
        }, {
          value: 2,
          text: '领班'
        }, {
          value: 3,
          text: '员工'
        }],
      }
    },
    created:function(){
      this.initVue()
    },
    methods: {
      // TODO 重置from表单（无效）
      initVue(){
        // if(this.value == 1){
        //   this.$nextTick(function(){
        //     console.log(this.$refs['message'])
        //   this.$refs['message'].resetFields();
        //   })
        // }
        this.myLevel = parseInt(localStorage.getItem('level'))
        getNotDataRequest('area/areaList').then(resp => {
          if (resp.status == 200) {
            this.areaList = resp.data
            // console.log(JSON.stringify(resp.data))
          }
          // TODO 异常处理
          else {

          }
        })
      },
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<style scoped>

</style>
