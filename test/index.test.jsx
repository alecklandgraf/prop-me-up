import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import propMeUp from '../src';

describe('PropType annotation', () => {
  describe('Simple PropTypes', () => {
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

  describe('Complex PropTypes', () => {
    it('complex smoke test', () => {
      expect(PropTypes.arrayOf(PropTypes.string).type).toBe('arrayOf');
      expect(PropTypes.arrayOf(PropTypes.string).arg.type).toBe('string');
      expect(PropTypes.arrayOf(PropTypes.string).required).toBe(false);
      expect(PropTypes.arrayOf(PropTypes.string).isRequired).toEqual(expect.any(Function));
      expect(PropTypes.arrayOf(PropTypes.string).isRequired.type).toBe('arrayOf');
      expect(PropTypes.arrayOf(PropTypes.string).isRequired.arg.type).toBe('string');
      expect(PropTypes.arrayOf(PropTypes.string).isRequired.required).toBe(true);
    });
  });
});

describe('Generates fake props', () => {
  let Button;
  beforeEach(() => {
    Button = ({ text }) => {
      return <div>{text}</div>;
    };
    const propTypes = {
      text: PropTypes.string,
    };
    Button.propTypes = propTypes;
  });

  it('generates fake props for a simple react component ', () => {
    const fakeProps = propMeUp(Button);
    expect(fakeProps.text).toEqual(expect.any(String));
  });

  it('can use a custom fake props generator', () => {
    const fakeProps = propMeUp(Button, { customGenerator: { string: () => 'hi' } });
    expect(fakeProps).toEqual({ text: 'hi' });
  });

  it('allows setting default props', () => {
    const fakeProps = propMeUp(Button, { props: { text: 'default prop' } });
    expect(fakeProps).toEqual({ text: 'default prop' });
  });
});
