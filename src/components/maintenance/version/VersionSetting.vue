<template>
  <div style="height: 91%">
    <databox :title="''" :dheight="99" :boxb="true">
      <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
        <div style="margin-top: 15px;height: 90%">
          <el-table
            class="my-table"
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            border>
            <el-table-column
              prop="versionNo"
              label="编号"
              sortable>
            </el-table-column>
            <el-table-column
              prop="lifeThreshold"
              label="寿命报警阈值（%）"
              width="250">
            </el-table-column>
            <el-table-column
              prop="description"
              label="设备描述"
              width="250">
            </el-table-column>
            <el-table-column
              prop="eqCount"
              label="设备数量"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateTime"
              sortable
              label="更新时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             v-if="myLevel<3">
              <template slot="header" slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="addArea(scope.row)">添加新设备类型
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </databox>
    <el-dialog
      width="30%"
      :title="dialoganme"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      v-if='dialogVisible'>
      <createForm v-bind:message="scopeRow" v-bind:value="buttonValue"></createForm>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteBut(scopeRow)" v-if="buttonValue == 3">删 除</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getNotDataRequest} from '../../../utils/api'
  import {postJsonRequest} from '../../../utils/api'
  import createForm from './CreateForm'

  export default {
    name: 'VersionSetting',
    components: {
      createForm,
    },
    methods: {
      // 获取设备信息事件
      getValue () {
        // 获取登录权限
        this.myLevel = parseInt(localStorage.getItem('level'))
        getNotDataRequest('/version/versionList').then(resp => {
          if (resp.status == 200) {
            this.tableData = resp.data
          }
          // TODO 异常处理
          else {

          }
        })
      },
      //编辑界面
      handleEdit (row) {
        // 允许修改
        // 需要编辑的参数
        this.scopeRow = Object.assign({}, row)
        if (row.areaChildren) {
          // 非叶子节点
          this.buttonValue = 2
        } else {
          // 叶子节点
          this.buttonValue = 3
        }
        this.dialoganme = '编辑'
        this.dialogVisible = true
      },
      // 添加新片区
      addArea () {
        this.buttonValue = 1
        this.scopeRow = Object.assign({}, this.defaultMsg)
        this.dialoganme = '添加设备型号'
        this.dialogVisible = true
      },
      // 确认按钮点击操作
      submitBut () {
        /////
        var thispram, messagerow
        ///// 校验文本
        if (!this.scopeRow) {
          this.$message({
            type: 'warning',
            message: '数据不能为空！'
          })
        } else if (!this.scopeRow.versionNo || this.scopeRow.versionNo == '') {
          this.$message({
            type: 'warning',
            message: '设备编号不能为空！'
          })
        } else if (!this.scopeRow.lifeThreshold || this.scopeRow.lifeThreshold == '') {
          this.$message({
            type: 'warning',
            message: '请填写剩余寿命！'
          })
        } else {
          thispram = {
            versionNo: this.scopeRow.versionNo,
            lifeThreshold: this.scopeRow.lifeThreshold,
            description: this.scopeRow.description,
          }
          // 新建设备型号
          messagerow = '添加成功！'
          console.log(thispram)
          postJsonRequest('/version/save', thispram).then(resp => {
            if (resp.status == 200) {
              this.dialogVisible = false
              console.log(resp.data)
              this.$message({
                type: 'success',
                message: messagerow
              })
              this.getValue()

            }
          })
        }

      },
      // 删除按钮点击操作
      deleteBut (data) {
        this.$confirm('确认删除用户?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          console.log(data.id)
          postJsonRequest('/version/deleteVersion', data).then(resp => {
            if (resp.status == 200) {
              this.dialogVisible = false
              console.log(resp)
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
    },
    mounted: function () {
      this.getValue()
    },
    data () {
      return {
        // 需要编辑的参数
        scopeRow: null,
        // 空的编辑参数
        defaultMsg: {
          versionNo: null,
          lifeThreshold: null,
          description: null,
          eqCount: null,
          updateTime: null
        },
        // 按钮类型(1新建2非节点3叶子节点)
        buttonValue: null,
        // 权限
        myLevel: 10,
        // dialog显示符
        dialogVisible: false,
        // dialog名称
        dialoganme: null,
        tableData: [],
      }
    }
  }

</script>
<style scoped>
  @import '../../home/dataBox/index.less';

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
  }
</style>
