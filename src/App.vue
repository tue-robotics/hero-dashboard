<template>
  <div id="app">
    <b-container>
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
    </b-container>
  </div>
</template>

<script>
/* eslint new-cap: ["error", { "properties": false }] */
/* eslint node/prefer-global/buffer: [error, never] */

import Battery from './components/Battery.vue'
import Indicator from './components/Indicator.vue'

import { remote } from 'electron'
import AutoRos from './services/ros'

export default {
  name: 'HeroDashboard',
  components: {
    Battery,
    Indicator
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
  width: 400px;
  height: 70px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#indicator {
  margin: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
}

#battery {
  position: fixed;
  top: 5px;
  left: 120px;
}
#battery_col {
  width: 120px;
  padding-left: 5px !important;
  padding-right: 5px !important;
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
