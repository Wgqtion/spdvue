<template>
    <div class="data-box" :class="{noborder: !boxb}"  :style="{ height: dheight + '%' }">
        <!--左上边框-->
        <div class="line-box" v-if="boxb">
            <i class="t-l-line myi"></i>
            <i class="l-t-line myi"></i>
        </div>
        <!--右上边框-->
        <div class="line-box" v-if="boxb">
            <i class="t-r-line myi"></i>
            <i class="r-t-line myi"></i>
        </div>
        <!--左下边框-->
        <div class="line-box" v-if="boxb">
            <i class="l-b-line myi"></i>
            <i class="b-l-line myi"></i>
        </div>
            <!--右下边框-->
        <div class="line-box" v-if="boxb">
            <i class="r-b-line myi"></i>
            <i class="b-r-line myi"></i>
        </div>
        <div class="in-title" v-if="title">{{title}}</div>
        <div class="chart">
        	<slot></slot>
        </div>
    </div>
</template>


<script>
export default {
  name: 'databox',
  props: {
    title: String,
    dheight: Number,
    icon: String,
    boxb:{
      type: Boolean,
      default: true
    }

  }
}
</script>

<style lang="less">
	@import './index.less';
</style>
