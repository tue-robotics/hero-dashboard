import React, { Component } from 'react';
import ROSLIB from 'roslib';
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
    data: '',
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
        Topic: {this.props.topic}, data: {this.state.data}
        <ProgressBar now={this.state.data} />
      </div>
    );
  }
}

export default Battery;
