import ROSLIB from 'roslib';

import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    let batteries = this.state.batteries
    batteries[msg.location] = {
      percentage: percentage,
      type: type
    }

    this.setState({
      batteries: batteries
    })
  }
  render() {
      return (
         <Row>
           {Object.keys(this.state.batteries).map( (value,index) => {
              return (
                <Col key={value}>
                  {value}
                  <div className="Battery" key={value}>
                    <ProgressBar
                      variant={this.state.batteries[value].type}
                      now={this.state.batteries[value].percentage}
                      label={`${this.state.batteries[value].percentage}%`}
                    />
                  </div>
                </Col>
              )
            })}
         </Row>
      );
   }
}

export default Battery;
