import PropTypes from 'prop-types';
import faker from 'faker';

const noop = () => undefined;

const simpleTypes = ['array', 'bool', 'func', 'number', 'object', 'string', 'symbol', 'any'];
const complexTypes = [
  'arrayOf',
  'element',
  'instanceOf',
  'node',
  'objectOf',
  'oneOf',
  'oneOfType',
  'shape',
];
// borrowed from react-generate-props
function addTypeToPropTypes() {
  simpleTypes.forEach(prop => {
    PropTypes[prop].type = prop;
    PropTypes[prop].required = false;
    PropTypes[prop].isRequired.type = prop;
    PropTypes[prop].isRequired.required = true;
  });
  // todo(aleck): add complex type annotations
  complexTypes.forEach(prop => {
    const originalPropType = PropTypes[prop];
    PropTypes[prop] = function(arg) {
      const propType = originalPropType(arg);
      Object.assign(propType, { arg, type: prop, required: false });
      Object.assign(propType.isRequired, { arg, type: prop, required: true });
      return propType;
    };
  });
}

// borrowed from react-generate-props
const GENERATORS = {
  // Simple types
  array: () => [],
  bool: () => faker.random.boolean(),
  func: () => () => undefined,
  number: () => faker.random.number(),
  object: () => ({}),
  string: () => faker.random.word(),
  any: () => 'Any',
  element: () => React.createElement('div'),
  node: () => [React.createElement('div'), React.createElement('div')],

  // Complex types
  arrayOf: type => [generateOneProp(type)],
  instanceOf: klass => new klass(),
  objectOf: type => ({ key: generateOneProp(type) }),
  oneOf: values => _.sample(values),
  oneOfType: types => generateOneProp(_.extend(_.sample(types), { forceGeneration: true })),
  shape: shape => generateProps(shape),
};

addTypeToPropTypes();

function propMeUp(component, { customGenerator = {}, props = {}, onlyRequired = false } = {}) {
  if (!component.propTypes || Object.keys(component.propTypes).length === 0) {
    return;
  }
  return Object.keys(component.propTypes).reduce((fakeProps, propName) => {
    const type = component.propTypes[propName].type;
    if (props[propName]) {
      return Object.assign(fakeProps, { [propName]: props[propName] });
    } else if (customGenerator[type]) {
      return { ...fakeProps, [propName]: customGenerator[type]() };
    }

    return { ...fakeProps, [propName]: GENERATORS[type]() };
  }, {});
}

export default propMeUp;
