import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Indicator from './Indicator';
import Battery from './Battery';

import './App.css';
import AutoRos from './ros';

class App extends Component {
  constructor() {
    super()
    AutoRos.connect('ws://hero1.local:9090');
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <div className="box">
              <Col>
                <Indicator ros={AutoRos.ros} />
              </Col>
            </div>
            <Col >
              HERO
              <Battery topic='battery_state/hero1' ros={AutoRos.ros} />
            </Col>
            <Col >
              LAPTOP
              <Battery topic='battery_state/hero2' ros={AutoRos.ros} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
