<template>
  <div style="height: 91%">
    <databox :title="''" :dheight="99" :boxb="true">
      <el-main class="line-box" style="background-color: rgba(0,0,0,0);height: 100%">
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
              prop="hostAddress"
              align="center"
              sortable
              label="网关IP">
            </el-table-column>
            <el-table-column
              prop="port"
              align="center"
              label="网关端口">
            </el-table-column>
            <el-table-column
              prop="eqCount"
              sortable
              align="center"
              label="设备数（个）">
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
                  :type="scope.row.online ? 'success' : 'danger'"
                  disable-transitions>{{getOnline(scope.row.online)}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateTime"
              label="更新时间"
              sortable
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </databox>
  </div>
</template>
<script>
  import {postJsonRequest} from '../../../utils/api'
  import {getNotDataRequest} from '../../../utils/api'

  export default {
    name: 'Gateway',
    components: {},
    methods: {
      // 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
      filterTag (value, row) {
        return row.online === value
      },
      // 在线状态
      getOnline (eqOnline) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].value == eqOnline) {
            return this.options[i].text
          }
        }
        return '未知'
      },
      // 获取设备信息事件
      getValue () {
        // 获取设备信息
        getNotDataRequest('/gateway/gatewayList').then(resp => {
          if (resp.status == 200) {
            this.content = resp.data
            this.loading = false
          }
          // TODO 异常处理
          else {

          }
        })
      },
      // 初始化方法
      refresh () {
        this.loading = true
        this.getValue()
      }
    },
    mounted: function () {
      this.refresh()
    },
    created: function () {
    },
    data () {
      return {
        options: [{
          value: true,
          text: '在线'
        }, {
          value: false,
          text: '不在线'
        }],
        loading: false,
        content: [],
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
  @import '../../home/dataBox/index.less';

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
