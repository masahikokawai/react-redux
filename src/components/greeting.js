import React, { PropTypes } from 'react';

function Greeting(props) {
  return (<div>Test {props.name}</div>);
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
