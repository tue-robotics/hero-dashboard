import ROSLIB from 'roslib';

import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './App.css';

var ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090',
});

class Battery extends Component {
  constructor(props) {
    super(props);
    this.topic = new ROSLIB.Topic({
      ros: ros,
      name: props.topic,
      messageType: 'std_msgs/String',
    });
  }

  state = {
    data: '100',
  }
  componentDidMount() {
    this.topic.subscribe(this.handleMessage);
  }
  componentWillUnmount() {
    this.topic.unsubscribe(this.handleMessage);
  }
  handleMessage = (msg) => {
    this.setState({
      data: msg.data,
    })
  }
  render() {
    return (
      <div className="Battery">
        <ProgressBar variant="success" now={this.state.data} label={`${this.state.data}%`}/>
      </div>
    );
  }
}

export default Battery;
