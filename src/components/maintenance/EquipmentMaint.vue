<template>
  <databox :title="''" :dheight="91" :boxb="true">
    <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
      <div class="div-inline">
        设备编号：
        <el-input class="myinput" v-model="spdNo" placeholder="请输入内容"></el-input>
        设备类型：
        <el-select class="myinput" v-model="versionId" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.versionId"
            :label="item.label"
            :value="item.versionId">
          </el-option>
        </el-select>
        维护时间：
        <el-date-picker
          v-model="timeFrame"
          type="datetimerange"
          value-format="timestamp"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        所属区域：
        <el-input class="myinput" v-model="input3" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="querySubmit()">搜索</el-button>
      </div>

      <div style="margin-top: 15px;height: 90%">
        <el-table
          class="my-table"
          :row-class-name="tableRowClassName"
          :data="content"
          style="width: 100%;"
          height="100%"
          align="center"
          v-loading="loading">
          <el-table-column
            prop="id"
            label="id">
          </el-table-column>
          <el-table-column
            prop="spdNo"
            sortable
            label="设备编号">
          </el-table-column>
          <el-table-column
            prop="versionNo"
            label="设备类型">
          </el-table-column>
          <el-table-column
            label="所属片区">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>所属: {{ scope.row.areaValue }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.areaName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="版本"
          >
          </el-table-column>
          <el-table-column
            prop="faultType"
            label="故障类型"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="操作员"
          >
          </el-table-column>
          <el-table-column
            prop="operType"
            label="操作类型"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="补充说明"
          >
          </el-table-column>
          <el-table-column
            prop="maintTime"
            label="维护时间"
            sortable
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.maintTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="faultTime"
            label="故障时间"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.faultTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="版本寿命阈值"
            v-if='false'>
          </el-table-column>
        </el-table>
        <div class="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="totalPages"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalElements">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </databox>
</template>
<script>
  import {postJsonRequest} from '../../utils/api'

  export default {
    name: 'EERuleTable',
    methods: {
      querySubmit () {
        this.urlparams.timeFrame = this.timeFrame
        this.urlparams.likeMap.spdNo = this.spdNo
        this.urlparams.eqMap.versionId = this.versionId
        console.log(JSON.stringify(this.urlparams))
        this.getValue()
      },
      getValue () {
        postJsonRequest('/maintlog/maintloglist', this.urlparams).then(resp => {
          if (resp.status == 200) {
            this.content = resp.data.content
            this.totalElements = resp.data.totalElements
            this.loading = false
          }
          // TODO 异常处理
          else {

          }
        })
      },
      tableRowClassName ({row, rowIndex}) {
        // console.log(row.status)
      },
      handleSizeChange (val) {
        this.urlparams.pageSize = val
        this.getValue()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.urlparams.pageNum = val
        this.getValue()
        console.log(`当前页: ${val}`)
      },
      // 初始化方法
      refresh () {
        console.log('初始化方法' + this.routename)
        console.log(this.routename)
        this.loading = true
        if (this.routename) {
          if (this.routename == 'map' || this.routename == 'areaCount') {
            this.urlparams.likeMap.areaCode = this.routevaluename
          }
          if (this.routename == 'version') {
            this.urlparams.eqMap.versionId = this.routevaluename
          }
        }
        this.getValue()
      }
    },
    mounted: function () {
      this.refresh()
    },
    created: function () {
      if (this.$route.params.name) {
        console.log(this.$route.params)
        this.routename = this.$route.params.name
        this.routevaluename = this.$route.params.value
        console.log(this.routename)
      }
      console.log(this.$route.params)
    },
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        versionId: null,
        spdNo: null,
        timeFrame: null,
        options: [{
          versionId: '1',
          label: '1/160'
        }, {
          versionId: '2',
          label: '4/80'
        }, {
          versionId: '3',
          label: '4/40'
        }],
        elestatus: '全检索',
        input3: '',
        select: '',
        totalElements: 0,
        totalPages: 0,
        pageNum: 1,
        pageSize: 10,
        currentPage4: 4,
        loading: false,
        content: [],
        routename: '',
        routevaluename: '',
        urlparams: {
          eqMap: {},
          likeMap: {},
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  }

</script>

<style>
  @import '../home/dataBox/index.less';

  .div-inline {
    display: inline!important;
    color: #ffffff!important;
  }

  .my-table {
    max-height: 100%!important;
    background-color: rgba(0, 0, 0, 0)!important;
    border-color: rgba(0, 0, 0, 0)!important;
  }

  .footer {
    margin-bottom: 0px;
    display: flex;
    box-sizing: content-box;
    padding-top: 10px;
    justify-content: space-between;
  }

  .el-table td, .el-table th {
    font-size: 14px;
    line-height: 10px;
    padding: 12px 0;
    /*height: 60%;*/
  }

  .el-select {
    width: 130px;
  }

  .input-with-select {
    width: 500px;
  }

</style>
