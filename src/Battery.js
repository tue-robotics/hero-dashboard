import ROSLIB from 'roslib';
import ros from './ros';

import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './App.css';

//var ros = new ROSLIB.Ros({
//  url: 'ws://localhost:9090',
//});

class Battery extends Component {
  constructor(props) {
    super(props);
    this.topic = new ROSLIB.Topic({
      ros: ros,
      name: props.topic,
      messageType: 'sensor_msgs/BatteryState',
    });
  }

  state = {
    percentage: 50,
    type: 'info'
  }
  componentDidMount() {
    this.topic.subscribe(this.handleMessage);
  }
  componentWillUnmount() {
    this.topic.unsubscribe(this.handleMessage);
  }
  handleMessage = (msg) => {
    var type;
    var percentage = Math.round(msg.percentage * 100)
    if (percentage > 40) {
      type = 'success';
    } else if (percentage > 20) {
      type = 'warning';
    } else {
      type = 'danger';
    }
    this.setState({
      percentage: percentage,
      type: type
    })
  }
  render() {
    return (
      <div className="Battery">
        <ProgressBar variant={this.state.type} now={this.state.percentage} label={`${this.state.percentage}%`}/>
      </div>
    );
  }
}

export default Battery;
