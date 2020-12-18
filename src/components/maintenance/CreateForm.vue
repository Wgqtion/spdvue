<template>
  <div>
    <el-form ref="message" :model="message" label-width="80px">
      <el-input
        v-model="message.id"
        v-if="false">
      </el-input>
      <el-form-item label="设备编号" prop="spdNo">
        <el-row :gutter="20">
          <el-col :span="11" style="padding-left: 0;">
            <el-input
              placeholder="请输入内容"
              v-model="message.spdNo">
            </el-input>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-plus" @click="handleAddList('message')">新设备</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="设备类型" prop="version.id">
        <el-row :gutter="20">
          <el-select v-model="message.version.id" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.versionNo"
              :value="item.id">
            </el-option>
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item label="所属区域" prop="areaCode">
        <el-row :gutter="20">
          <el-cascader
            v-model="message.areaCode"
            :options="areaList"
            :props="{ checkStrictly: true,value:'code',label:'name',children:'areaChildren' }"
            clearable></el-cascader>
        </el-row>
      </el-form-item>
    </el-form>

    <el-dialog
      width="30%"
      title="双击选择新设备"
      :visible.sync="innerVisible"
      append-to-body>
      <el-table :data="newEquipments" @row-dblclick="selectDblclick">
        <el-table-column property="spdNo" label="设备编号" width="150"></el-table-column>
        <el-table-column property="status" label="状态" width="200"></el-table-column>
        <el-table-column property="silc" label="剩余寿命"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {getNotDataRequest} from '../../utils/api'

export default {
  name: 'FaultForm',
  props: ['message', 'value'],
  data () {
    return {
      areaList: [],
      rules: {},
      gridData: [],
      options: [{
        id: 1,
        versionNo: '1/160',
        lifeThreshold:0
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
      innerVisible: false,
      newEquipments: [],
    }
  },
  created: function () {
    this.initVue()
    this.newEquipmentList()
  },
  methods: {
    newEquipmentList () {
      getNotDataRequest('spd/newEquipmentList').then(resp => {
        if (resp.status == 200) {
          this.newEquipments = resp.data
          // console.log(JSON.stringify(resp.data))
        }
        // TODO 异常处理
        else {

        }
      })
    },
    // TODO 重置from表单（无效）
    initVue () {
      // if(this.value == 1){
      //   this.$nextTick(function(){
      //     console.log(this.$refs['message'])
      //   this.$refs['message'].resetFields();
      //   })
      // }
      // 获取片区信息
      getNotDataRequest('area/areaList').then(resp => {
        if (resp.status == 200) {
          this.areaList = resp.data
          // console.log(JSON.stringify(resp.data))
        }
        // TODO 异常处理
        else {

        }
      })
      // 获取设备类型信息
      getNotDataRequest('version/versionList').then(resp => {
        if (resp.status == 200) {
          console.log(this.options)
          this.options = resp.data
        }
        // TODO 异常处理
        else {

        }
      })

    },
    onSubmit () {
      console.log('submit!')
    },
    // 选择新设备
    handleAddList () {
      this.innerVisible = true;
    },
    // 双击选择新设备
    selectDblclick(item){
      console.log(item)
      this.message.spdNo = item.spdNo;
      this.innerVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
