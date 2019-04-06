import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Battery from './Battery';
import ROSLIB from 'roslib';
import ros from './ros';
import './App.css';
import Indicator from './Indicator';

var exampleTopic = new ROSLIB.Topic({
  ros: ros,
  name: '/com/endpoint/example',
  messageType: 'std_msgs/String',
});

class App extends Component {
  onClick = (e) => {
    var msg = new ROSLIB.Message({
      data: 'some string',
    });
    exampleTopic.publish(msg);
  }
  render() {
    return (
      <div className="App">
        <Battery topic='/hero/battery_state'/>
        <Battery topic='/hero/laptop_battery_state'/>
        <Button onClick={this.onClick}>Publish</Button>
        <Indicator />
      </div>
    );
  }
}

export default App;
