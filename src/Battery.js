import ROSLIB from 'roslib';

import React, { Component } from 'react';
import { Progress } from 'reactstrap';
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
    var type = 'info';
    var percentage = Math.round(msg.percentage*100)
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
    var ordered = {};
    Object.keys(batteries).sort().forEach(function(key) {
      ordered[key] = batteries[key];
    })

    this.setState({
      batteries: ordered
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
                    <Progress
                      color={this.state.batteries[value].type}
                      value={this.state.batteries[value].percentage}
                      style={{'background-color': '#d0d0d0', 'position': 'relative'}} >
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
