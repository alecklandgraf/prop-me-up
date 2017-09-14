# prop-me-up

Auto-generate fake props for your React components by their prop types.

This is largely borrowed from `react-generate-props` with a couple differences:
  - no `lodash` dependency
  - set explicit props
  - customize the PropType generator
  - `faker` as the default PropType generator

  ### Getting started
Installation
```
npm install prop-me-up -D
```

Usage (for a jest test)
```jsx
import React from 'react';
import propMeUp from 'prop-me-up';
import { shallow } from 'enzyme';

Button = ({ text }) => {
  return <div>{text}</div>;
};
const propTypes = {
  text: PropTypes.string,
};
Button.propTypes = propTypes;

describe('TestButton', () => {
  it('renders', () => {
    const props = propMeUp(Button);
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.prop('text')).toBeDefined();
  });
});
```

