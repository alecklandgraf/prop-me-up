import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import propMeUp from '../src';

describe('Simple PropTypes are annotated', () => {
  it('smoke test', () => {
    expect(PropTypes.string.type).toBe('string');
    expect(PropTypes.string.required).toBe(false);
    expect(PropTypes.string.isRequired.required).toBe(true);
    expect(PropTypes.string.isRequired.type).toBe('string');
  });

  it('adds a type proptery to simple types', () => {
    const simpleTypes = ['array', 'bool', 'func', 'number', 'object', 'string', 'symbol', 'any'];
    simpleTypes.forEach(prop => {
      expect(PropTypes[prop].type).toBe(prop);
    });
  });

  it('props that are isRequired have a required prop == true', () => {
    const simpleTypes = ['array', 'bool', 'func', 'number', 'object', 'string', 'symbol', 'any'];
    simpleTypes.forEach(prop => {
      expect(PropTypes[prop].required).toBe(false);
      expect(PropTypes[prop].isRequired.required).toBe(true);
    });
  });
});

describe('generates fake props', () => {
  it('generates fake props for a simple react component ', () => {
    function Button({ text }) {
      return <div>{text}</div>;
    }
    const propTypes = {
      text: PropTypes.string,
    };
    Button.propTypes = propTypes;
    const fakeProps = propMeUp(Button);
    expect(fakeProps).toEqual({ text: '' });
  });

  it('uses custom fake props', () => {
    function Button({ text }) {
      return <div>{text}</div>;
    }
    const propTypes = {
      text: PropTypes.string,
    };
    Button.propTypes = propTypes;
    const fakeProps = propMeUp(Button, { customGenerator: { string: () => 'hi' } });
    expect(fakeProps).toEqual({ text: 'hi' });
  });
});
