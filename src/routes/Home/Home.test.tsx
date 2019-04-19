import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

it('renders correctly', () => {
  const wrapper = shallow(
    <Home pomodoroTime={0} breakTime={0} isMuted={false} longBreakTime={0} />,
  );

  expect(wrapper).toMatchSnapshot();
});
