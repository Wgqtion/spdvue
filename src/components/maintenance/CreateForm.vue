<template>
  <el-form ref="message" :model="message" label-width="80px">
    <el-input
      v-model="message.id"
      v-if="false">
    </el-input>
    <el-form-item label="设备编号" prop="spdNo">
      <el-col :span="11">
        <el-input
          placeholder="请输入内容"
          v-model="message.spdNo">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="设备类型" prop="version.id">
      <el-select v-model="message.version.id" placeholder="请选择类型">
        <el-option
          v-for="item in options"
          :key="item.versionId"
          :label="item.label"
          :value="item.versionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属区域" prop="areaCode">
      <el-cascader
        v-model="message.areaCode"
        :options="areaList"
        :props="{ checkStrictly: true,value:'code',label:'name',children:'areaChildren' }"
        clearable></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
  import {getNotDataRequest} from '../../utils/api'
  export default {
    name: 'FaultForm',
    props: ['message', 'value'],
    data () {
      return {
        areaList:[],
        rules: {

        },
        options: [{
          versionId: 1,
          label: '1/160'
        }, {
          versionId: 2,
          label: '4/80'
        }, {
          versionId: 3,
          label: '4/40'
        }],
        selectStatus: [{
          id: 1,
          name: '设备预警'
        }, {
          id: 2,
          name: '设备掉线'
        }, {
          id: 3,
          name: '设备损坏'
        }, {
          id: 4,
          name: '数据显示异常'
        }, {
          id: 5,
          name: '未知'
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
