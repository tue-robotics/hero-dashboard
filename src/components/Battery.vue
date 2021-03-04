<template>
  <b-container
    fluid
    class="p-0 m-0"
  >
    <b-row>
      <b-col
        v-for="(v, key) in batteries"
        id="battery_col"
        :key="key"
        align="center"
      >
        <span>
          <h5 vertical-align="text-bottom">
            {{ key }}
            <font-awesome-icon
              v-if="v.charging"
              id="bolt"
              :icon="['fas', 'bolt']"
            />
          </h5>
        </span>
        <b-progress
          id="batteryProgress"
          class="w-100"
        >
          <b-progress-bar
            :value="v.percentage"
            :animated="v.charging"
            :variant="v.type"
          >
            <span class="position-absolute w-100 d-block"><b>{{ v.percentage }}%</b></span>
          </b-progress-bar>
        </b-progress>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ROSLIB from 'roslib'

export default {
  name: 'Battery',
  props: {
    ros: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      batteryTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: 'battery',
        messageType: 'sensor_msgs/BatteryState'
      }),
      batteries: {}
    }
  },
  mounted () {
    this.batteryTopic.subscribe(this.handleBatteryMsg)
  },
  beforeUnmount () {
    this.batteryTopic.unsubscribe()
  },
  methods: {
    setupClearBatteryType (key, seconds = 10) {
      if (this.batteries[key].TypeTimeOut) {
        clearTimeout(this.batteries[key].TypeTimeOut)
      }
      this.batteries[key].TypeTimeOut = setTimeout(() => {
        this.batteries[key].type = 'dark'
        this.batteries[key].charging = false
      }, seconds * 1000)
    },
    setupRemoveBattery (key, seconds = 60) {
      if (this.batteries[key].RemoveTimeOut) {
        clearTimeout(this.batteries[key].RemoveTimeOut)
      }
      this.batteries[key].RemoveTimeOut = setTimeout(() => {
        console.log('deleting battery', key)
        this.$delete(this.batteries, key)
      }, seconds * 1000)
    },
    handleBatteryMsg (msg) {
      let type = 'info'
      const percentage = Math.round(msg.percentage * 100)
      if (percentage > 40) {
        type = 'success'
      } else if (percentage > 20) {
        type = 'warning'
      } else {
        type = 'danger'
      }

      const batteries = this.batteries
      const key = msg.location

      // Get battery or create new one
      let battery
      if (!Object.prototype.hasOwnProperty.call(batteries, key)) {
        battery = {
          percentage: null,
          type: null,
          charging: null,
          TypeTimeOut: null,
          RemoveTimeOut: null
        }
      } else {
        battery = batteries[key]
      }
      // Only update the state, not the timeouts, which are done
      // at the end
      battery.percentage = percentage
      battery.type = type
      battery.charging = msg.power_supply_status === 1 // POWER_SUPPLY_STATUS_CHARGING = 1

      // Update current battery
      batteries[key] = battery

      // Order batteries, so it shown on alphabetical order
      const ordered = {}
      Object.keys(batteries).sort().forEach(function (key) {
        ordered[key] = batteries[key]
      })

      // Update batteries with ordered
      this.batteries = ordered

      // Setup Timeouts for this battery
      this.setupClearBatteryType(key, 10)
      this.setupRemoveBattery(key, 60)
    }
  }
}
</script>

<style>
#bolt {
  color: #FFFF00;
  height: 1rem;
  width: auto;
}
#batteryProgress {
  background-color: #d0d0d0;
}
</style>
