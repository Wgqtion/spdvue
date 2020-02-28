<template>
  <div style="height: 91%">
    <databox :title="''" :dheight="99" :boxb="true">
      <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
        <div class="div-inline">
          登录名：
          <el-input class="myinput" v-model="eqLoginName" placeholder="请输入内容"></el-input>
          用户名：
          <el-input class="myinput" v-model="likeName" placeholder="请输入内容"></el-input>
          &nbsp;&nbsp;账户等级：
          <el-select class="myinput" v-model="eqLevel" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.text"
              :value="item.value"
              :disabled="item.value <= urlparams.eqMap.myLevel">
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          &nbsp;&nbsp;<el-button type="primary" icon="el-icon-search" @click="querySubmit()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()" v-if="urlparams.eqMap.myLevel < 2">添加用户
          </el-button>
        </div>


        <div style="margin-top: 15px;height: 90%">
          <el-table
            class="my-table"
            :data="content"
            align="center"
            style="width: 100%;"
            height="100%"
            v-loading="loading">
            <el-table-column
              width="60%"
              align="center"
              prop="id"
              label="id"
              v-if="false">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="loginName"
              align="center"
              label="登录名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="level"
              :filters="options"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              label="账户等级">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.level === urlparams.eqMap.myLevel ? 'primary' : 'success'"
                  disable-transitions>{{getLevel(scope.row.level)}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateTime"
              label="更新时间"
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
                  @click="handleEdit(scope.row)"
                  :disabled="handleDisplay(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="changePassword(scope.row)">修改密码
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
      <createForm v-bind:message="scopeRow" v-bind:value="buttonValue" v-if="buttonValue != 3"></createForm>
      <changePassword v-bind:message="passwordRuleForm" v-if="buttonValue == 3"></changePassword>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteBut(scopeRow)" v-if="buttonValue == 2">禁 用</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {postJsonRequest} from '../../utils/api'
  import createForm from './CreateForm'
  import changePassword from './ChangePassword'

  export default {
    name: 'User',
    components: {
      createForm,
      changePassword
    },
    methods: {
      // 点击搜索按钮
      querySubmit () {
        // 需要模糊查询参数
        this.urlparams.likeMap.eqLoginName = this.eqLoginName
        // 需要准确查询参数
        this.urlparams.likeMap.likeName = this.likeName
        // 用户等级
        this.urlparams.eqMap.eqLevel = this.eqLevel
        this.getValue()
      },
      //添加界面
      handleAdd () {
        this.scopeRow = Object.assign({}, this.defaultParentMsg)
        // 允许修改
        this.buttonValue = 1
        this.dialoganme = '添加'
        this.dialogVisible = true
      },
      // 是否显示编辑按钮
      handleDisplay (row) {
        if (row.loginName == localStorage.getItem('name')) {
          return true
        } else if (this.urlparams.eqMap.myLevel > 1) {
          return false
        } else {
          return false
        }
      },
      //编辑界面
      handleEdit (row) {
        // 允许修改
        // 需要编辑的参数
        this.scopeRow = Object.assign({}, row)
        this.buttonValue = 2
        this.dialoganme = '编辑'
        this.dialogVisible = true
      },
      // 修改密码
      changePassword (row) {
        // 不允许修改
        this.buttonValue = 3
        this.changePasswordName = row.loginName
        this.dialoganme = '修改密码'
        this.dialogVisible = true
      },
      // 删除按钮点击操作
      deleteBut (data) {
        this.$confirm('确认删除用户?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          console.log(data.id)
          postJsonRequest('/spd/deleteUser', {loginName: data.loginName}).then(resp => {
            if (resp.status == 200) {
              this.dialogVisible = false
              console.log(resp)
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.$nextTick(function () {
                this.getValue()
              })
            }
          })
        }).catch(() => {
        })
      },
      // 确认按钮点击操作
      submitBut () {
        // 新建 或 修改数据
        if (this.buttonValue == 1 || this.buttonValue == 2) {
          ///// 校验文本
          if (!this.scopeRow) {
            this.$message({
              type: 'warning',
              message: '数据不能为空！'
            })
          } else if (!this.scopeRow.name || this.scopeRow.name == '') {
            this.$message({
              type: 'warning',
              message: '登录名不能为空！'
            })
          } else if (!this.scopeRow.loginName || this.scopeRow.loginName == '') {
            this.$message({
              type: 'warning',
              message: '用户名不能为空！'
            })
          } else if (!this.scopeRow.level || this.scopeRow.level == '') {
            this.$message({
              type: 'warning',
              message: '用户等级不能为空！'
            })
          }
          /////
          var thispram, messagerow
          if (this.buttonValue == 2) {
            thispram = {
              id: this.scopeRow.id,
              name: this.scopeRow.name,
              loginName: this.scopeRow.loginName,
              level: this.scopeRow.level,
            }
            messagerow = '修改成功！'
          } else {
            thispram = {
              name: this.scopeRow.name,
              loginName: this.scopeRow.loginName,
              level: this.scopeRow.level,
              password: '111111'
            }
            messagerow = '新建账户成功！默认密码：111111，请及时修改！'
          }
          postJsonRequest('/user/save', thispram).then(resp => {
            if (resp.status == 200) {
              this.dialogVisible = false
              this.getValue()
              this.$message({
                type: 'success',
                message: messagerow
              })
            }
          })
          //////
        }
        // 修改密码
        else if (this.buttonValue == 3) {
          if (this.passwordRuleForm.password1 != this.passwordRuleForm.password2) {
            this.$message({
              type: 'warning',
              message: '两次输入不一致！'
            })
          }
          else if (this.passwordRuleForm.password1 && this.passwordRuleForm.password1 != '') {
            /////
            postJsonRequest('/user/changePassword', {
              loginName: this.changePasswordName,
              password: this.passwordRuleForm.password1
            }).then(resp => {
              if (resp.status == 200) {
                this.dialogVisible = false
                this.getValue()
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
              }
            })
            /////
          } else {
            this.$message({
              type: 'warning',
              message: '密码不能为空！'
            })
          }
        }
        else {
          this.dialogVisible = false
        }
      },
      // 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
      filterTag (value, row) {
        return row.level === value
      },
      // 等级名称
      getLevel (level) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value == level) {
            return this.options[i].text
          }
        }
        return '未知'
      },
      // 获取设备信息事件
      getValue () {
        this.urlparams.eqMap.myLevel = parseInt(localStorage.getItem('level'))
        this.urlparams.eqMap.userId = parseInt(localStorage.getItem('userId'))
        // 获取设备信息
        postJsonRequest('/user/getUserList', this.urlparams).then(resp => {
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
        // 需要修改密码的用户
        changePasswordName: null,
        // 检索参数
        eqLoginName: null,
        likeName: null,
        eqLevel: null,
        // 选择当前行
        scopeRow: null,

        // 修改密码绑定参数
        passwordRuleForm: {},
        // 检索参数：设备状态
        selecatdata: [],
        // 按钮点击来源
        buttonValue: 0,
        // 弹出框名称
        dialoganme: '',
        parentMsg: null,
        // 新建用户参数
        defaultParentMsg: {
          name: null,
          loginName: null,
          level: null,
        },
        dialogVisible: false,
        versionId: null,
        options: [{
          value: 0,
          text: '管理员'
        }, {
          value: 1,
          text: '主管'
        }, {
          value: 2,
          text: '领班'
        }, {
          value: 3,
          text: '员工'
        }],
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
        // 检索列表参数
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
  .my-table {
    max-height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
  }
</style>
<style>
  @import '../home/dataBox/index.less';

  .myinput {
    width: 180px;
  }

  .div-inline {
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
  }
</style>
