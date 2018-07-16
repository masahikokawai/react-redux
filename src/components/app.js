import React, { Component } from 'react';

import Greeting from './greeting'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'DEF',
    }
  }

  handleMouseOver() {
    this.setState({ name: 'ABC' })
  }

  handleMouseOut() {
    this.setState({ name: 'XYZ' })
  }

  render() {
    return (
      <div
        onMouseOver={() => this.handleMouseOver()}
        onMouseOut={() => this.handleMouseOut()}
      >
        <Greeting name={this.state.name} />
      </div>
    );
  }
}

export default App;
