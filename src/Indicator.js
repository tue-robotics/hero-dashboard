import ROSLIB from 'roslib';
import ros from './ros';

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: 'runstop_button',
            messageType: 'std_msgs/Bool',
        });
    }

    state = {
        data: true,
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
        var type;
        if (this.state.data) {
            type = 'danger';
        } else {
            type = 'success';
        }

        return (
            <div className="Indicator">
                <Button variant={type} disabled><i className="fas fa-power-off"></i></Button>
            </div>
        );
    }
}

export default Indicator;
