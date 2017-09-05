import React from 'react';
import PropTypes from 'prop-types';
import propMeUp from '../src';

describe('PropTypes are annotated', () => {
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
});
