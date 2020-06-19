import ROSLIB from 'roslib';

import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

import './App.css';

class Battery extends Component {
  constructor(props) {
    super(props);
    this.topic = new ROSLIB.Topic({
      ros: props.ros,
      name: props.topic,
      messageType: 'sensor_msgs/BatteryState',
    });
  }

  state = {
    batteries: {}
  }
  componentDidMount() {
    this.topic.subscribe(this.handleMessage);
  }
  componentWillUnmount() {
    this.topic.unsubscribe(this.handleMessage);
  }
  updateBatteriesState(batteries) {
    const copyState = this.state
    copyState.batteries = batteries
    this.setState(copyState)
  }
  handleMessage = (msg) => {
    var type = 'info'
    const percentage = Math.round(msg.percentage * 100)
    if (percentage > 40) {
      type = 'success'
    } else if (percentage > 20) {
      type = 'warning'
    } else {
      type = 'danger'
    }

    const batteries = this.state.batteries
    const key = msg.location

    // Get battery or create new one
    var battery
    if (!batteries.hasOwnProperty(key)) {
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

    // Update batteries state with ordered
    this.updateBatteriesState(ordered)

    // Setup Timeouts for this battery
    this.setupClearBatteryType(key, 10)
    this.setupRemoveBattery(key, 60)
  }
  setupClearBatteryType (key, seconds = 10) {
    if (this.state.batteries[key].TypeTimeOut) {
      // No setState is required as no ui changes are needed
      clearTimeout(this.state.batteries[key].TypeTimeOut)
    }
    // eslint-disable-next-line
    this.state.batteries[key].TypeTimeOut = setTimeout(() => {
      this.batteryTypeTimeout(key)
    }, seconds * 1000)
  }
  setupRemoveBattery (key, seconds = 60) {
    if (this.state.batteries[key].RemoveTimeOut) {
      // No setState is required as no ui changes are needed
      clearTimeout(this.state.batteries[key].RemoveTimeOut)
    }
    // eslint-disable-next-line
    this.state.batteries[key].RemoveTimeOut = setTimeout(() => {
      console.log('deleting battery', key)
      this.batteryDelete(key)
    }, seconds * 1000)
  }
  batteryTypeTimeout (key) {
    // setState needs to be called as ui needs update
    const copyBatteries = this.state.batteries
    copyBatteries[key].type = 'dark'
    copyBatteries[key].charging = false
    this.updateBatteriesState(copyBatteries)
  }
  batteryDelete (key) {
    // setState needs to be called as ui needs update
    const copyBatteries = this.state.batteries
    delete copyBatteries[key]
    this.updateBatteriesState(copyBatteries)
  }
  render() {
      return (
         <Row>
           {Object.keys(this.state.batteries).map( (value,index) => {
              return (
                <Col key={value} align="center">
                  {value}
                  {this.state.batteries[value].charging ? (
                    <FontAwesomeIcon icon={faBolt} id="bolt"/>
                    ) : (
                    null)
                    }
                  <div className="Battery" key={value}>
                    <Progress
                      color={this.state.batteries[value].type}
                      value={this.state.batteries[value].percentage}
                      animated={this.state.batteries[value].charging}
                      style={{'backgroundColor': '#d0d0d0', 'position': 'relative'}} >
                      <span style={{'position': 'absolute', 'display': 'block', 'width': '100%'}} >
                        <b>{`${this.state.batteries[value].percentage}%`}</b>
                      </span>
                    </Progress>
                  </div>
                </Col>
              )
            })}
         </Row>
      );
   }
}

export default Battery;
