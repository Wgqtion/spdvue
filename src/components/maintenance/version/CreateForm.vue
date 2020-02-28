<template>
  <el-form ref="message" :model="message" :rules="rules" label-width="80px">
    <el-input
      v-model="message.id"
      v-if="false">
    </el-input>
    <el-form-item label="设备编号" prop="versionNo">
      <el-col :span="21">
        <el-input
          placeholder="请输入内容"
          v-model="message.versionNo">
        </el-input>
      </el-col>
    </el-form-item>
    <!--<el-form-item label="所属区域" prop="parentCode">-->
      <!--<el-tooltip class="item" effect="dark" content="只有叶子节点支持修改" placement="right-start" :disabled="value!=2">-->
        <!--<el-cascader-->
          <!--v-model="message.parentCode"-->
          <!--:options="areaList"-->
          <!--:props="{ checkStrictly: true,value:'code',label:'name',children:'areaChildren'}"-->
          <!--clearable-->
          <!--:disabled="value == 2"></el-cascader>-->
      <!--</el-tooltip>-->

    <!--</el-form-item>-->
    <el-form-item label="剩余寿命阈值" prop="lifeThreshold">
      <el-col :span="21">
        <el-input
          type="number"
          placeholder="请输入内容"
          v-model.number="message.lifeThreshold">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-col :span="21">
        <el-input
          placeholder="请输入内容"
          v-model.number="message.description">
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
        versionList: [],
        rules: {
          versionNo:[{required: true, message: '请输入设备编号', trigger: 'blur'}],
          lifeThreshold:[{  type:'number', message: '剩余寿命阈值填写数字', trigger: 'blur' },
            { required: true, message: '填写剩余寿命阈值', trigger: 'blur' }]
        }
      }
    },
    created:function(){
      console.log("创建视图")
      this.initVue()
  },
    methods: {
      // TODO 重置from表单（无效）
      initVue () {
      },
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>

<style scoped>

</style>
