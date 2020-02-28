<template>
  <databox :title="''" :dheight="91" :boxb="true">
    <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
      <!-- 搜索控件 -->
      <dev-info v-bind:message="content" v-bind:value="loading" @changeMsg="changeMsg" @loadOn="loadOn"></dev-info>
      <div style="height: 85%">
        <el-table
          class="my-table"
          :row-class-name="tableRowClassName"
          :data="content"
          @row-click="clickTable"
          ref="refTable"
          style="width: 100%;"
          height="100%"
          align="center"
          v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-inline" v-if="props.row.equipmentEvent">
                <el-row>
                  <el-col span="3">
                    <el-form-item label="设备编号：">
                      <span>{{ props.row.equipmentEvent.spdNo }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="3">
                    <el-form-item label="L1 漏 电 流 ：">
                      <span>{{ props.row.equipmentEvent.silcL1 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L2 漏 电 流 ：">
                      <span>{{ props.row.equipmentEvent.silcL2 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L3 漏 电 流 ：">
                      <span>{{ props.row.equipmentEvent.silcL3 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="N 漏 电 流 ：">
                      <span>{{ props.row.equipmentEvent.silcL4 }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="3">
                    <el-form-item label="L1雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL1 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L2雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL2 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L3雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL3 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="N雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL4 }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="3">
                    <el-form-item label="L1雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL1}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L2雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL2}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L3雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL3}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="N雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL4}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="3">
                    <el-form-item label="L1剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL1 }}%</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L2剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL2 }}%</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="L3剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL3 }}%</span>
                    </el-form-item>
                  </el-col>
                  <el-col span="3">
                    <el-form-item label="N剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL4 }}%</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            prop="id"
            label="id"
            v-if="false">
          </el-table-column>
          <el-table-column
            sortable
            prop="spdNo"
            label="设备编号">
          </el-table-column>
          <el-table-column
            prop="version.id"
            label="设备类型"
            :filters="options"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                type="primary"
                disable-transitions>{{getVersion(scope.row.version.id)}}
              </el-tag>
            </template>
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
            prop="equipmentEvent.silc"
            label="最大漏电流(μA)"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="equipmentEvent.lightningAmplitude"
            label="最大雷击幅值(KA)"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="equipmentEvent.lightningCount"
            label="雷击总数(次)"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="equipmentEvent.lifeTerm"
            label="最大剩余寿命（%）"
            sortable>
          </el-table-column>
          <el-table-column
            prop="equipmentEvent.edition"
            label="版本"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            sortable
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="初次上线时间"
            sortable
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
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
  // 导入搜索控件
  import devInfo from '../commonTools/devInfo'

  export default {
    name: 'EERuleTable',
    components: {
      devInfo
    },
    methods: {
      // 是否可以打开
      rowOpen (row) {
        console.log(row)
        if (row) {
          return 'expand'
        } else {
          return 'selection'
        }
      },
      //获取子组件的值
      changeMsg (val) {
        this.content = val
      },
      //获取子组件的停止加载动画值
      loadOn (val) {
        this.loading = val
      },
      // 点击展开
      clickTable (row, index, e) {
        this.$refs.refTable.toggleRowExpansion(row)
      },
      // 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
      filterTag (value, row) {
        return row.version.id === value
      },
      // 设备类型
      getVersion (versionId) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value == versionId) {
            return this.options[i].text
          }
        }
        return '未知'
      },
      getValue () {
        // 获取列表信息
        postJsonRequest('/spd/equipmentList', this.urlparams).then(resp => {
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
      // 行样式
      tableRowClassName ({row, rowIndex}) {
        // console.log(row.status)
        if (row.status == 2) {
          return 'danger-row'
        } else if (row.status == 0) {
          return 'success-row'
        } else if (row.status == 1) {
          return 'warning-row'
        } else {
          return ''
        }
      },
      handleSizeChange (val) {
        this.urlparams.pageSize = val
        this.getValue()
        // console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.urlparams.pageNum = val
        this.getValue()
        // console.log(`当前页: ${val}`)
      },
      // 初始化方法
      refresh () {
        // console.log('初始化方法' + this.routename)
        // console.log(this.routename)
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
        // console.log(this.$route.params)
        this.routename = this.$route.params.name
        this.routevaluename = this.$route.params.value
        // console.log(this.routename)
      }
      // console.log(this.$route.params)
    },
    data () {
      return {
        value: '',
        options: [{
          value: 1,
          text: 'IES-1/160'
        }, {
          value: 2,
          text: 'IES-4/80'
        }, {
          value: 3,
          text: 'IES-4/40'
        }],
        elestatus: [],
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
<style scoped>
</style>
<style>
  @import '../home/dataBox/index.less';

  .whiteItem .el-form-item__label {
    color: white;
  }

  .el-table td, .el-table th {
    font-size: 14px;
    line-height: 10px;
    padding: 12px 0;
    /*height: 60%;*/
  }
</style>
