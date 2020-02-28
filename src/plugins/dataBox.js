import databox from '../components/home/dataBox/index'

const components = {
  databox
}

const install = (Vue, options = {}) => {
  if(install.installed) return
  //注册为全局组件
  Object.keys(components).forEach(component => {
    Vue.component("databox", databox)
  })
  install.installed = true
}

install.installed = false

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  install.installed = true
}

const Vcomp = {
  ...components,
  install
}

export default Vcomp
