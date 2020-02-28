<template>
  <div style="height: 91%">
    <databox :title="''" :dheight="99" :boxb="true">
      <div class="flex-container-parent">
        <div class="flex-container">
          <div v-for="o in content" :key="o.id" class="box">
            <div style="height: 100%;width: 100%" @click="openBox(o)">
              <div style="display: flex;height: 39px;">
                <p>编号:[{{o.spdNo}}] &nbsp</p>
                <p>类型:{{o.version.versionNo}}&nbsp;</p>
                <p :hidden="good_icon(o)">
                  <svg style="margin-bottom:0px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20"
                       height="20" id="el_rhu0-Ku4">
                    <g id="el_eizYCb35lD_an_ySe4IYZT" data-animator-group="true" data-animator-type="2">
                      <g id="el_eizYCb35l">
                        <path fill="#1afa29"
                              d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m262.544 381.417L463.417 692.544a35.84 35.84 0 0 1-13.049 8.338c-13.045 5.388-28.612 2.785-39.214-7.816l-161.22-161.22c-14.059-14.059-14.059-36.853 0-50.912 14.059-14.059 36.853-14.059 50.912 0l136.179 136.179 286.608-286.608c14.059-14.059 36.853-14.059 50.912 0 14.058 14.059 14.058 36.853-0.001 50.912z"
                              id="el_RqeyXSFpvZ"/>
                      </g>
                    </g>
                  </svg>
                </p>
                <p :hidden="warning_icon(o)">
                  <svg style="margin-bottom:0px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20"
                       height="20" id="el_rhu0-Ku4">
                    <g id="el_eizYCb35lD_an_ySe4IYZT" data-animator-group="true" data-animator-type="2">
                      <g id="el_eizYCb35l">
                        <path fill="#ffff00"
                              d="M512 960c70.4 0 128-57.6 128-128H384c0 70.4 57.6 128 128 128z m320-384V448c0-153.6-108.8-281.6-256-313.6V128c0-38.4-25.6-64-64-64s-64 25.6-64 64v6.4C300.8 166.4 192 294.4 192 448v128l-128 128v64h896v-64l-128-128z"
                              id="el_RqeyXSFpvZ"/>
                      </g>
                    </g>
                  </svg>
                </p>
                <p :hidden="danger_icon(o)">
                  <svg style="margin-bottom:0px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="20"
                       height="20" id="el_rhu-Ku4">
                    <g id="el_eizYCb3lD_an_ySe4IYZT" data-animator-group="true" data-animator-type="2">
                      <g id="el_eizYCb35l">
                        <path fill="#ff0000"
                              d="M 882.176 770.048 c -0.512 -1.024 -0.512 -2.048 -1.024 -3.072 L 556.544 205.312 c 0 -0.512 -0.512 -0.512 -0.512 -1.024 c -0.512 -1.024 -16.384 -23.04 -43.008 -23.04 c -26.112 0 -44.032 20.992 -44.544 22.016 c -0.512 0.512 -1.024 1.024 -1.024 1.536 l -322.56 559.104 c -0.512 0.512 -0.512 1.024 -1.024 2.048 c -1.024 3.072 -9.728 29.696 3.072 50.176 c 12.8 20.992 39.936 26.112 43.008 26.624 h 640 c 1.024 0 29.184 -2.56 44.544 -23.04 c 15.36 -20.48 8.192 -48.128 7.68 -49.664 Z M 485.888 387.072 c 0 -14.336 11.776 -26.112 26.112 -26.112 s 26.112 11.776 26.112 26.112 v 216.576 c 0 14.336 -11.776 26.112 -26.112 26.112 s -26.112 -11.776 -26.112 -26.112 V 387.072 Z M 512 757.248 c -23.04 0 -41.984 -18.944 -41.984 -41.984 S 488.96 673.28 512 673.28 s 41.984 18.944 41.984 41.984 S 535.04 757.248 512 757.248 Z"
                              id="e_RqeyXSFpvZ"/>
                      </g>
                    </g>
                  </svg>
                </p>
              </div>
              <el-table
                :data="o.tableData"
                :border="isborder"
                style="width: 100%;background-color: rgba(0, 0, 0, 0)">
                <el-table-column
                  type="index"
                  :index="indexMethod"
                  height="20%"
                  width="49%">
                </el-table-column>
                <el-table-column
                  prop="L1"
                  label="L1"
                  width="50%">
                </el-table-column>
                <el-table-column
                  prop="L2"
                  label="L2"
                  width="50%">
                </el-table-column>
                <el-table-column
                  prop="L3"
                  label="L3"
                  width="50%">
                </el-table-column>
                <el-table-column
                  prop="L4"
                  label="N"
                  width="50%">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="totalPages"
              :page-sizes="[28]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements">
            </el-pagination>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-alert
              title="S 漏电流,A 浪涌幅值,C 浪涌计数,L 剩余寿命"
              type="info"
              center
              show-icon>
            </el-alert>
          </el-col>
        </el-row>
        <div class="clearfloat"></div>
      </div>
    </databox>
    <div>
      <el-dialog
        class="my-dialog"
        :lock-scroll='false'
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <dialog-msg v-bind:message="parentMsg"></dialog-msg>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import eq_normal from '../../assets/svg/eq_normal.svg'
  import {postJsonRequest} from '../../utils/api'
  import dialogMsg from './DialogMsg'
  // import {MessageBox} from 'element-ui'

  export default {
    components: {
      dialogMsg
    },
    name: 'EEGridTable',
    created: function () {
      console.log('silc 应力感应漏电流;应力引起的泄漏电流;应变诱导漏电流', 'Amplitude 振幅', 'Count 计数', 'life 寿命')
      if (this.$route.params.name) {
        this.routename = this.$route.params.name
        this.routevaluename = this.$route.params.value
        console.log(this.routename)
      }
      console.log(this.$route.params)
    },
    methods: {
      handleClose (done) {
        done()
      },
      // 打开详细信息弹窗层
      openBox (boxmsg) {
        this.dialogTitle = '编号:[' + boxmsg.spdNo + ']  类型:' + boxmsg.version.versionNo
        this.dialogVisible = true
        this.parentMsg = boxmsg
      },
      good_icon (equi) {
        if (equi.status == 0) {
          return false
        } else {
          return true
        }
      },
      danger_icon (equi) {
        if (equi.status == 2) {
          return false
        } else {
          return true
        }
      },
      warning_icon (equi) {
        if (equi.status == 1) {
          return false
        } else {
          return true
        }
      },
      getValue () {
        postJsonRequest('/spd/equipmentList', this.urlparams).then(resp => {
          if (resp.status == 200) {

            this.content = resp.data.content
            // console.log('后端返回值1：' + JSON.stringify(this.content))
            this.totalElements = resp.data.totalElements
            for (var i = 0; i < this.content.length; i++) {
              var tableData = [{}, {}, {}, {}]
              tableData[0].L1 = this.content[i].equipmentEvent.silcL1
              tableData[0].L2 = this.content[i].equipmentEvent.silcL2
              tableData[0].L3 = this.content[i].equipmentEvent.silcL3
              tableData[0].L4 = this.content[i].equipmentEvent.silcL4
              tableData[1].L1 = this.content[i].equipmentEvent.lightningAmplitudeL1
              tableData[1].L2 = this.content[i].equipmentEvent.lightningAmplitudeL2
              tableData[1].L3 = this.content[i].equipmentEvent.lightningAmplitudeL3
              tableData[1].L4 = this.content[i].equipmentEvent.lightningAmplitudeL4
              tableData[2].L1 = this.content[i].equipmentEvent.lightningCountL1
              tableData[2].L2 = this.content[i].equipmentEvent.lightningCountL2
              tableData[2].L3 = this.content[i].equipmentEvent.lightningCountL3
              tableData[2].L4 = this.content[i].equipmentEvent.lightningCountL4
              tableData[3].L1 = this.content[i].equipmentEvent.lifeTermL1
              tableData[3].L2 = this.content[i].equipmentEvent.lifeTermL2
              tableData[3].L3 = this.content[i].equipmentEvent.lifeTermL3
              tableData[3].L4 = this.content[i].equipmentEvent.lifeTermL4
              // console.log('后端返回值3：' + JSON.stringify(tableData))
              this.content[i].tableData = tableData
            }
            // console.log('后端返回值3：' + JSON.stringify(this.content))
            this.loading = false
          }
          // TODO 异常处理
          else {

          }
        })
      },
      indexMethod (index) {
        if (index == 0) {
          return 'S'
        } else if (index == 1) {
          return 'A'
        }
        else if (index == 2) {
          return 'C'
        }
        else if (index == 3) {
          return 'L'
        }
        return index
      },
      tableRowClassName ({row, rowIndex}) {

      },
      handleSizeChange (val) {

      },
      handleCurrentChange (val) {

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
          if (this.routename == 'rightTop') {
            this.urlparams.status = this.routevaluename
          }
        }
        this.getValue()
      }
    },
    mounted: function () {
      this.refresh()
    },
    data () {
      return {
        parentMsg: '',
        dialogVisible: false,
        dialogTitle: '',
        totalElements: 0,
        totalPages: 0,
        pageNum: 1,
        versionNo: '',
        spdNo: '',
        versionNo: {},
        pageSize: 28,
        currentPage4: 4,
        loading: false,
        content: [],
        isborder: true,
        urlparams: {
          eqMap: {},
          likeMap: {},
          pageNum: 1,
          pageSize: 28
        },
      }
    }
  }
</script>

<style scoped>
  .my-el-icon {
    display: inline-block;
  }

  p {
    margin-top: 8px;
    margin-left: 8px;
    font-size: 14px;
  }

  .box {
    border-radius: 10px;
    height: 180px;
    width: 250px;
    background: #ffffff;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;

  }

  .flex-container-parent {
    /*display: flex;*/
    width: 100%;
    height: 158%;
    justify-content: center;
    /*overflow:scroll;*/
  }

  .flex-container {
    width: 100%;
    display: flex;
    max-height: 60%;
    overflow: auto;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgba(0, 0, 0, 0);
    /*overflow:auto;*/
  }

  .el-table >>> .hyaline-row {
    background: #77ff77;
  }

  .el-table >>> td, .el-table >>> th {

    background-color: rgba(0, 0, 0, 0);
    font-size: 8px;
    line-height: 10px;
    padding: 2px 0;
    /*height: 60%;*/
  }

  .el-table >>> tr {
    background-color: rgba(0, 0, 0, 0);
  }

  .my-dialog >>> .el-dialog {
    border: 2px solid #2C58A6;
    /*background: url("../../assets/img/bg01big2index.png") no-repeat;*/
    background: #4788fbc1;
    background-size: 100% 100%
  }

  .my-dialog >>> .el-dialog__title {
    color: white;
  }
</style>
<style type="text/css">
  @import '../home/dataBox/index.less';

  .el-table__header-wrapper th:nth-last-of-type(2) {
    border-right: none !important;
    border-left: none !important;
  }

  .el-table--border {
    border-right: none !important;
    border-left: none !important;
  }

  .el-table--border td:nth-last-of-type(1) {
    border-right: none !important;
    border-left: none !important;
  }

  .el-table--border::after, .el-table--group::after {
    width: 0 !important;
  }

  .el-table {
    height: 78%;
    background-color: rgba(0, 0, 0, 0);
  }

  .clearfloat {
    clear: both;
    height: 0;
    font-size: 1px;
    line-height: 0px;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
