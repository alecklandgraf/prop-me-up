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

function propMeUp(component, { defaultFunction = noop, onlyRequired = false }) {
  if (!component.propTypes || Object.keys(c.propTypes).length === 0) {
    return;
  }

  // return Object.entries(component).map(([name, prop]) = {
  //   console.log(name)
  // })
}

export default propMeUp;
