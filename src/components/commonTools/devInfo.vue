<!--
设备检索控件
-->
<template>
  <el-form inline class="demo-form-inline">
    <el-form-item label="设备编号：" class="whiteItem" >
      <el-input placeholder="请输入内容" v-model="spdNo"></el-input>
    </el-form-item>
    <el-form-item label="设备类型：" class="whiteItem">
      <el-select v-model="versionId" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.versionId"
          :label="item.label"
          :value="item.versionId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备状态：" class="whiteItem">
      <el-checkbox-group v-model="elestatus">
        <el-checkbox-button v-for="city in cities" :label="city.key" :key="city.key">{{city.value}}</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="所属区域：" class="whiteItem">
      <el-cascader
        v-model="areaCode"
        :options="areaList"
        :props="{ checkStrictly: true,value:'code',label:'name',children:'areaChildren',expandTrigger: 'hover' }"
        clearable></el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="querySubmit()">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {getNotDataRequest} from '../../utils/api'
  import {postJsonRequest} from '../../utils/api'
  const cityOptions = [{
    key: 0,
    value: '正常'
  }, {
    key: 1,
    value: '预警'
  }, {
    key: 2,
    value: '故障'
  }];
  export default {
    name: 'devInfo',
    props: ['message', 'value'],
    methods:{
      // 点击搜索按钮
      querySubmit () {
        // 同步停止加载动画到父控件
        this.$emit('loadOn', true);
        // 需要模糊查询参数
        this.urlparams.likeMap.spdNo = this.spdNo
        // 需要准确查询参数
        this.urlparams.eqMap.versionId = this.versionId
        // 判断片区选择框是否为空，如果为空赋null；如果不为空，取叶子结点
        if (this.areaCode) {
          this.urlparams.likeMap.areaCode = this.areaCode[this.areaCode.length - 1]
        } else {
          this.urlparams.likeMap.areaCode = null
        }
        // 赋值设备状态
        this.urlparams.status = this.elestatus
        this.selEquipment()
      },
      // 检索设备
      selEquipment(){
        // 获取设备信息
        postJsonRequest('/spd/equipmentList', this.urlparams).then(resp => {
          if (resp.status == 200) {
            // 同步数据到父控件
            this.$emit('changeMsg', resp.data.content);
            // 同步停止加载动画到父控件
            this.$emit('loadOn', false);
          }
          // TODO 异常处理
          else {

          }
        })
      },
      // 初始化方法
      getValue(){
        // 获取片区列表
        getNotDataRequest('/area/areaList').then(resp => {
          if (resp.status == 200) {
            this.areaList = resp.data
            console.log(this.areaList)
            console.log('xxxxx',this.content)
          }
          // TODO 异常处理
          else {

          }
        })
      }
    },
    mounted: function () {
      this.getValue()
    },
    data(){
      return{
        // 设备列表
        content:this.message,
        loading:this.value,
        // 检索参数设备编号
        spdNo: '',
        // 检索参数设备类型
        versionId: null,
        // 设备类型列表
        options: [{
          versionId: 1,
          label: 'IES-1/160'
        }, {
          versionId: 2,
          label: 'IES-4/80'
        }, {
          versionId: 3,
          label: 'IES-4/40'
        }],
        // 检索参数设备状态
        elestatus: [],
        // 片区列表
        areaList:[],
        // 检索参数片区编号
        areaCode: null,
        // 状态列表
        cities:cityOptions,
        //检索条件
        urlparams: {
          eqMap: {},
          likeMap: {},
          status: [],
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  }
</script>

<style>
  @import '../home/dataBox/index.less';
</style>
