import Vue from 'vue'
import Router from 'vue-router'
import EquipmentEvent from '@/components/equipmentEvent/EquipmentEvent'
import EERuleTable from '@/components/equipmentEvent/EERuleTable'
import EEGridTable from '@/components/equipmentEvent/EEGridTable'
import EquipmentMaint from '@/components/maintenance/EquipmentMaint'
import EquipmentFault from '@/components/maintenance/EquipmentFault'
import Home from '@/components/home/Home'
import index from '@/components/index'
import login from '@/components/login'
import User from '@/components/systemSetting/User'
import AreaSetting from '@/components/maintenance/area/AreaSetting'
import Gateway from '@/components/equipmentEvent/gateway/Gateway'
import Version from '@/components/maintenance/version/VersionSetting'
import texter from '@/components/texter'
import SvgIcon from '@/components/SvgIcon/SvgIcon'// svg component

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: 'home',
        name: 'home',
        component: Home
      }, {
        path: 'equipment_event',
        name: '设备详情',
        component: EquipmentEvent
      },
        {
          path: 'ee_rule_table',
          name: '浪涌基本信息',
          component: EERuleTable
        },
        {
          path: 'ee_grid_table',
          name: '浪涌设备状态',
          component: EEGridTable
        },
        {
          path: 'gateway',
          name: '网关信息',
          component: Gateway
        },
        {
          path: 'equipment_maint',
          name: '维护记录',
          component: EquipmentMaint
        },
        {
          path: 'equipment_fault',
          name: '浪涌故障记录',
          component: EquipmentFault
        },
        {
          path: 'user',
          name: '用户管理',
          component: User
        },
        {
          path: 'area_setting',
          name: '片区',
          component: AreaSetting
        },
        {
          path: 'version_setting',
          name: '设备型号',
          component: Version
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/texter',
      name: 'texter',
      component: texter
    },
  ]
})
