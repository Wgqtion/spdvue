<template>
  <el-form ref="message" :model="message" label-width="80px">
    <el-form-item label="设备编号" prop="spdNo">
      <el-col :span="11">
        <el-input
          v-model="message.spdNo"
          disabled>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="设备类型" prop="version.id">
      <el-select v-model="message.version.id" placeholder="请选择类型" disabled>
        <el-option
          v-for="item in options"
          :key="item.versionId"
          :label="item.label"
          :value="item.versionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属区域" prop="areaValue" disabled>

      <el-input
        v-model="message.areaValue"
        disabled>
      </el-input>
    </el-form-item>
    <el-form-item label="故障类型" prop="status">
      <el-select v-model="message.status" placeholder="请选择故障类型">
        <el-option
          v-for="item in selectStatus"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="维护时间" prop="maintTime">
      <el-col :span="11">
        <el-date-picker
          v-model="message.maintTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="操作类型" prop="operType">
      <el-radio-group v-model="message.operType">
        <el-radio :label=1>设备上电</el-radio>
        <el-radio :label=2>设备更换</el-radio>
        <el-radio :label=3>未修复</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="补充说明" prop="description">
      <el-input type="textarea" v-model="message.description"></el-input>
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
