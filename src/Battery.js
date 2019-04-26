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
    data: '35',
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
    let value = <ProgressBar variant="success" now={this.state.data} label={`${this.state.data}%`}/>;
    if (this.state.data < 10) {
      value = <ProgressBar variant="danger" now={this.state.data} label={`${this.state.data}%`}/>;
    } else if (this.state.data < 50) {
      value = <ProgressBar variant="warning" now={this.state.data} label={`${this.state.data}%`}/>;
    } else {
      value = <ProgressBar variant="success" now={this.state.data} label={`${this.state.data}%`}/>;
    }

    return (
      <div className="Battery">
        {value}
      </div>
    );
  }
}

export default Battery;
