<template>
  <div className="Indicator">
    <b-button
      :variant="type"
      disabled
    >
      <font-awesome-icon
        id="power-off"
        :icon="['fas', 'power-off']"
      />
    </b-button>
  </div>
</template>

<script>
import ROSLIB from 'roslib'

export default {
  name: 'Indicator',
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
      indicatorTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: 'runstop_button',
        messageType: 'std_msgs/Bool'
      }),
      type: 'dark'
    }
  },
  mounted () {
    this.indicatorTopic.subscribe(this.handleMsg)
    this.ros.on('close', this.OnClose.bind(this))
  },
  beforeUnmount () {
    this.indicatorTopic.unsubscribe()
  },
  methods: {
    handleMsg (msg) {
      if (msg.data) {
        this.type = 'danger'
      } else {
        this.type = 'success'
      }
    },
    OnClose () {
      this.type = 'dark'
    }
  }
}
</script>

<style>
</style>
