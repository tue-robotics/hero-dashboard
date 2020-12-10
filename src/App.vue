<template>
  <div id="app">
    <b-row>
      <b-col>
        <Indicator
          id="indicator"
          :ros="ros"
        />
      </b-col>
      <b-col>
        <Battery
          id="battery"
          :ros="ros"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint new-cap: ["error", { "properties": false }] */
/* eslint node/prefer-global/buffer: [error, never] */

import AutoRos from 'auto-ros'
import { Battery, Indicator } from 'hero-vue'

import { BCol, BRow } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { remote } from 'electron'

export default {
  name: 'HeroDashboard',
  components: {
    Battery,
    Indicator,
    'b-col': BCol,
    'b-row': BRow
  },
  data () {
    return {
      ros: AutoRos.ros
    }
  },
  mounted () {
    const argv = remote.process.argv
    const index = argv.length - 1
    let url = this.endPoint
    if (index > 0) {
      const host = argv[index]
      url = `ws://${host}:9090`
    }
    AutoRos.connect(url)
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 375px;
  height: 60px;
  line-height: 1.15;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#indicator {
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#battery {
  position: fixed;
  top: 5px;
  left: 120px;
}
#battery_col {
  width: 120px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 0px;
  margin-right: 0px;
}
.row {
  display: inline-flex;
}
#battery h5 {
  margin: 0px;
  font-size: 1.0rem;
  font: inherit;
}
#batteryProgress {
  height: 1.5rem;
}
</style>
