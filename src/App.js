import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Indicator from './Indicator';
import Battery from './Battery';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <div className="box">
              <Col>
                <Indicator />
              </Col>
            </div>
            <Col >
              HERO
              <Battery topic='battery_state/hero1' />
            </Col>
            <Col >
              LAPTOP
              <Battery topic='battery_state/hero2' />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
