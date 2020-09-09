import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Indicator from './Indicator';
import Battery from './Battery';
import AutoRos from './ros';

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
