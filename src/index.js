import PropTypes from 'prop-types';

const noop = () => undefined;

// borrowed from react-generate-props
function addTypeToPropTypes() {
  for (const [propType, val] in Object.entries(PropTypes)) {
    if (val.isRequired !== undefined) {
      val.type = propType;
      val.isRequired.type = propType;
      val.isRequired.isRequired = true;
    } else {
      const og = val;
      val = function (arg) {
        this.arg = arg;
        this.type = propType;
        this.isRequired = { type: propType, arg };
        return og(arg);
      }
    }
  }
}

function propMeUp(component, { defaultFunction = noop, onlyRequired = false }) {
  if (!component.propTypes || Object.keys(c.propTypes).length === 0) {
    return;
  }

  return Object.entries(component).map(([name, prop]) = {

  })
}

export default propMeUp;
