<template>
  <el-form ref="message" :model="message" :rules="rules" label-width="80px">
    <el-input
      v-model="message.id"
      v-if="false">
    </el-input>
    <el-form-item label="片区名称" prop="name">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.name">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="所属区域" prop="parentCode">
      <el-tooltip class="item" effect="dark" content="只有叶子节点支持修改" placement="right-start" :disabled="value!=2">
        <el-cascader
          v-model="message.parentCode"
          :options="areaList"
          :props="{ checkStrictly: true,value:'code',label:'name',children:'areaChildren'}"
          clearable
          :disabled="value == 2"></el-cascader>
      </el-tooltip>

    </el-form-item>
    <el-form-item label="经度" prop="longitude">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.longitude">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="纬度" prop="latitude">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.latitude">
        </el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
  import {getNotDataRequest} from '../../../utils/api'

  export default {
    name: 'CreateForm',
    props: ['message', 'value'],
    data () {
      return {
        myLevel: null,
        areaList: [],
        rules: {
          name: [{required: true, message: '请输入片区名称', trigger: 'blur'}],
          longitude: [{
            pattern: /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/, message: '经度填写数字,精度最大为小数点后10位！', trigger: 'blur'
          }, {
              required: true, message: '填写坐标经度', trigger: 'blur'
            }],
          latitude: [{
            required: true,  message: '填写坐标纬度', trigger: 'blur'
          }, {
            pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/, message: '填写坐标纬度,精度最大为小数点后10位！', trigger: 'blur'
          }]
        }
      }
    },
    created: function () {
      console.log('创建视图')
      this.initVue()
    },
    methods: {
      // TODO 重置from表单（无效）
      initVue () {
        this.myLevel = parseInt(localStorage.getItem('level'))
        getNotDataRequest('area/areaList').then(resp => {
          if (resp.status == 200) {
            if (this.value == 1) {
              this.areaList = resp.data
            } else {
              this.areaList = this.disabledThisNode(resp.data)
            }
            console.log(JSON.stringify(this.areaList))
          }
          // TODO 异常处理
          else {

          }
        })
      },

      // 递归禁止选择自己
      disabledThisNode (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].areaChildren) {
            data[i].areaChildren = this.disabledThisNode(data[i].areaChildren)
          } else {
            if (data[i].code == this.message.code) {
              data[i].disabled = true
              return data
            }
          }
        }
        return data
      },

      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<style scoped>

</style>
