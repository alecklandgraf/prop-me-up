import PropTypes from 'prop-types';

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
}

addTypeToPropTypes();

const string = () => '';
const number = () => Math.floor(Math.random() * 100);

const faker = {
  string,
  number,
};

function propMeUp(component, { customGenerator = {}, props = {}, onlyRequired = false } = {}) {
  if (!component.propTypes || Object.keys(component.propTypes).length === 0) {
    return;
  }
  return Object.keys(component.propTypes).reduce((fakeProps, propName) => {
    const type = component.propTypes[propName].type;
    if (props[propName]) {
      return Object.assign(fakeProps, { [propName]: props[propName] });
    } else if (customGenerator[type]) {
      // todo(aleck): get spread working with jest
      // return { ...fakeProps, [propName]: custom.type() };
      return Object.assign(fakeProps, { [propName]: customGenerator[type]() });
    }

    // return { ...fakeProps, [propName]: faker[type]() };
    return Object.assign(fakeProps, { [propName]: faker[type]() });
  }, {});
}

export default propMeUp;
