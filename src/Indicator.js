import ROSLIB from 'roslib';
import ros from './ros';

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';

console.log(ros);

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/hero/runstop_button',
            messageType: 'std_msgs/Bool',
        });
    }

    state = {
        data: false,
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
        let value = <Button variant='danger'><i className="fas fa-power-off"></i></Button>;
        if (this.state.data) {
            value = <Button variant='success'><i className="fas fa-power-off"></i></Button>;
        }

        return (
            <div className="Indicator">
                {value}
      </div>
        );
    }
}

export default Indicator;
