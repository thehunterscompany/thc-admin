import React from 'react';
import { shallow } from 'enzyme/build';

import Dashboard from './views/dashboard/Dashboard.js';
import App from './App';

it('mounts App without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount();
});

it('mounts Dashboard without crashing', () => {
  const wrapper = shallow(<Dashboard />);
  wrapper.unmount();
});
