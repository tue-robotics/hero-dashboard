import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Indicator from './Indicator';
import Battery from './Battery';
import AutoRos from './ros';

/**
 * timeout [ms] needs to be smaller than RECONNECT_TIMEOUT
 * sleeptime [ms] needs to be smaller than timeout to have multiple checks
 */
function waitForRosClosed(timeout, sleeptime) {
  return new Promise(resolve => {
    var start_time = Date.now();
    function checkRosStatus() {
      if (AutoRos.status === 'closed') {
        resolve();
      } else if (Date.now() > start_time + timeout) {
        console.log('ROS not closed yet closed before timeout');
        resolve();
      } else {
        window.setTimeout(checkRosStatus, sleeptime);
      }
    }
    checkRosStatus();
  });
}

afterAll(async () => {
  AutoRos.ros.close();
  await waitForRosClosed(4500, 100);
})

test('App', () => {
  const { container } = render(<App />);
  const IndicatorElement = container.querySelector('div.Indicator');
  expect(IndicatorElement).not.toBeNull();
  const BatteryElement = container.querySelector('div.Battery');
  expect(BatteryElement).toBeNull();
});

test('Indicator', () => {
  const { container } = render(<Indicator ros={AutoRos.ros} />);
  const IndicatorElement = container.querySelector('div.Indicator');
  expect(IndicatorElement).not.toBeNull();
});

test('Empty Battery', () => {
  const { container } = render(<Battery topic='battery' ros={AutoRos.ros} />);
  const BatteryElement = container.querySelector('div.Battery');
  expect(BatteryElement).toBeNull();
});
