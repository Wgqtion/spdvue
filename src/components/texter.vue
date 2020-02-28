<template>
  <div>
    <canvas ref="canvas3"></canvas>
  </div>
</template>

<script>
  import {init} from '../utils/rainTrough'
  import {animloop} from '../utils/rainTrough'
  export default {
    mounted: function () {
      // rainTrough
      //console.log(rainTrough)
      init(this.$refs.canvas3);
      animloop();
    },
    created: function () {
      // rainTrough.canvas3 = document.getElementById('canvas');

    },
    methods: {

    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  canvas {
    width: 100%;
    height: 100%;
  }
  body:after {
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 0;
    animation: thunder-bg 6s infinite;
  }

  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
