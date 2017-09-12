# prop-me-up

Auto-generate fake props for your React components by their prop types.

This is largely borrowed from `react-generate-props` with a couple differences:
  - refactored not to depend on `lodash`
  - includes `faker` for smart default props
  - allows setting explicit props or providing a custom prop type generator

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

