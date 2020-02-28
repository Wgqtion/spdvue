<template>
  <div style="height: 91%">
    <databox :title="''" :dheight="99" :boxb="true">
      <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
        <el-row>
          <el-col :span="18">
            <dev-info v-bind:message="content" v-bind:value="loading" @changeMsg="changeMsg"
                      @loadOn="loadOn"></dev-info>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd('message')">添加设备</el-button>
          </el-col>
        </el-row>
        <!-- 搜索控件 -->


        <div style="margin-top: 15px;height: 85%">
          <el-table
            class="my-table"
            :row-class-name="tableRowClassName"
            :data="content"
            align="center"
            style="width: 100%;"
            height="100%"

            v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" v-if="props.row.equipmentEvent">
                  <div>
                    <el-form-item label="设备编号：">
                      <span>{{ props.row.spdNo }}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="L1漏电流：" highlight-current-row=true>
                      <span>{{ props.row.equipmentEvent.silcL1 }}</span>
                    </el-form-item>
                    <el-form-item label="L2漏电流：">
                      <span>{{ props.row.equipmentEvent.silcL2 }}</span>
                    </el-form-item>
                    <el-form-item label="L3漏电流：">
                      <span>{{ props.row.equipmentEvent.silcL3 }}</span>
                    </el-form-item>
                    <el-form-item label="L4漏电流：">
                      <span>{{ props.row.equipmentEvent.silcL4 }}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="L1雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL1 }}</span>
                    </el-form-item>
                    <el-form-item label="L2雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL2 }}</span>
                    </el-form-item>
                    <el-form-item label="L3雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL3 }}</span>
                    </el-form-item>
                    <el-form-item label="L4雷击幅值：">
                      <span>{{ props.row.equipmentEvent.lightningAmplitudeL4 }}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="L1雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL1}}</span>
                    </el-form-item>
                    <el-form-item label="L2雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL2}}</span>
                    </el-form-item>
                    <el-form-item label="L3雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL3}}</span>
                    </el-form-item>
                    <el-form-item label="L4雷击计数：">
                      <span>{{ props.row.equipmentEvent.lightningCountL4}}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="L1剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL1 }}%</span>
                    </el-form-item>
                    <el-form-item label="L2剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL2 }}%</span>
                    </el-form-item>
                    <el-form-item label="L3剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL3 }}%</span>
                    </el-form-item>
                    <el-form-item label="L4剩余寿命：">
                      <span>{{ props.row.equipmentEvent.lifeTermL4 }}%</span>
                    </el-form-item>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              width="60%"
              align="center"
              prop="id"
              label="id"
              v-if="false">
            </el-table-column>
            <el-table-column
              prop="spdNo"
              align="center"
              sortable
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
              align="center"
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
              align="center"
              prop="equipmentEvent.edition"
              label="版本"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="equipmentEvent.lifeTerm"
              label="剩余寿命（%）"
              sortable
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateTime"
              label="更新时间"
              sortable
            >

            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="初次上线时间"
              sortable
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="handleFault(scope.row)">维护
                </el-button>
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
    <el-dialog
      width="30%"
      :title="dialoganme"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible">
      <faultForm v-bind:message="parentMsg" v-bind:value="buttonValue" v-if="buttonValue == 3"></faultForm>
      <createForm v-bind:message="scopeRow" v-bind:value="buttonValue" v-if="buttonValue != 3"></createForm>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteBut(scopeRow)" v-if="buttonValue == 2">删 除</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitQF()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {postJsonRequest} from '../../utils/api'
  import {getNotDataRequest} from '../../utils/api'
  import faultForm from './FaultForm'
  import createForm from './CreateForm'
  // 导入搜索控件
  import devInfo from '../commonTools/devInfo'

  export default {
    name: 'EERuleTable',
    components: {
      faultForm,
      createForm,
      devInfo
    },
    methods: {
      //获取子组件的值
      changeMsg (val) {
        this.content = val
      },
      //获取子组件的停止加载动画值
      loadOn (val) {
        this.loading = val
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
      // 点击搜索按钮
      querySubmit () {
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
        this.urlparams.status = this.selecatdata
        this.getValue()
      },
      //设备添加界面
      handleAdd (data) {
        this.isEdit = false
        this.scopeRow = Object.assign({}, this.defaultParentMsg)
        // 允许修改
        this.buttonValue = 1
        this.dialoganme = '设备添加'
        this.dialogVisible = true
      },
      //设备编辑界面
      handleEdit (row) {
        // 允许修改
        this.buttonValue = 2
        // 是编辑操作
        this.isEdit = true
        // 需要编辑的参数
        this.scopeRow = Object.assign({}, row)
        this.dialoganme = '设备编辑'
        this.dialogVisible = true
      },
      // 设备维护界面
      handleFault (row) {
        // 不允许修改
        this.buttonValue = 3
        // 不是编辑操作
        this.isEdit = false
        // 需要维护的设备参数
        this.parentMsg = Object.assign({}, {
          spdNo: row.spdNo,
          version: row.version,
          area: row.area,
          areaValue: row.areaValue
        })
        this.dialoganme = '设备维护'
        this.dialogVisible = true
      },
      // 删除按钮点击操作
      deleteBut (data) {
        this.$confirm('确认删除该设备记录?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          // console.log(data.id)
          postJsonRequest('/spd/deleteEquipment', {id: data.id}).then(resp => {
            if (resp.status == 200) {
              this.dialogVisible = false
              // console.log(resp)
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.getValue()
            }
          })
        }).catch(() => {
        })
      },
      // 确定按钮
      submitQF () {
        // 编辑
        if (this.isEdit || this.buttonValue == 1) {
          if (!this.scopeRow) {
            this.$message({
              type: 'warning',
              message: '编辑设备不能为空！'
            })
          } else if (!this.scopeRow.spdNo || this.scopeRow.spdNo == null) {
            this.$message({
              type: 'warning',
              message: '设备编号不能为空！'
            })
          } else if (!this.scopeRow.version.id || this.scopeRow.version.id == null) {
            this.$message({
              type: 'warning',
              message: '设备类型不能为空！'
            })
          } else if (!this.scopeRow.areaCode || this.scopeRow.areaCode == null) {
            this.$message({
              type: 'warning',
              message: '设备片区不能为空！'
            })
          }
          else {
            // 保存
            // console.log(this.scopeRow)
            if (this.scopeRow.areaCode instanceof Array) {
              var areaCodeArray = Object.assign([], this.scopeRow.areaCode)
              this.scopeRow.areaCode = areaCodeArray[areaCodeArray.length - 1]
            }
            // console.log(this.scopeRow.areaCode)
            postJsonRequest('/spd/save', this.scopeRow).then(resp => {
              if (resp.status == 200) {
                // console.log(this.content)
                this.loading = false
                this.dialogVisible = false
                if (this.isEdit) {
                  this.$message({
                    type: 'success',
                    message: '编辑成功！'
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: '添加成功！'
                  })
                }
                this.getValue()
              }
              // TODO 异常处理
              else {

              }
            })
          }
        }
        // 添加
        else if (this.buttonValue == 1) {

        }
        // 维护
        else if (this.buttonValue == 3) {

        }
      },
      // 获取设备信息事件
      getValue () {
        // console.log(this.urlparams)
        // 获取设备信息
        postJsonRequest('/spd/equipmentList', this.urlparams).then(resp => {
          if (resp.status == 200) {
            this.content = resp.data.content
            this.totalElements = resp.data.totalElements
            console.log(this.content)
            this.loading = false
          }
          // TODO 异常处理
          else {

          }
        })
        getNotDataRequest('/area/areaList').then(resp => {
          if (resp.status == 200) {
            this.areaList = resp.data
            // console.log(this.areaList)
          }
          // TODO 异常处理
          else {

          }
        })
      },
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
      },
      handleCurrentChange (val) {
        this.urlparams.pageNum = val
        this.getValue()
      },
      // 初始化方法
      refresh () {
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
        this.routename = this.$route.params.name
        this.routevaluename = this.$route.params.value
      }
    },
    data () {
      return {
        scopeRow: null,
        areaCode: null,
        areaList: [],
        // 检索参数：设备状态
        selecatdata: [],
        // 按钮点击来源
        buttonValue: 0,
        // 是否为编辑操作
        isEdit: true,
        // 弹出框名称
        dialoganme: '',
        spdNo: null,
        parentMsg: null,
        selecatStatus: [{
          key: 0,
          value: '正常'
        }, {
          key: 1,
          value: '预警'
        }, {
          key: 2,
          value: '故障'
        }],
        defaultParentMsg: {
          area: {
            code: null
          },
          id: null,
          spdNo: null,
          status: null,
          version: {
            id: null
          },
          areaId: null
        },
        dialogVisible: false,
        versionId: null,
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
          status: [],
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  }

</script>
<style scoped>
  @import '../home/dataBox/index.less';

  .div-inline {
    display: Inline;
    display: flex;
    align-items: center;
    color: #ffffff;
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
</style>
