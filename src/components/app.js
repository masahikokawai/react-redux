import React, { Component } from 'react';

import Greeting from './greeting'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'DEF',
    }
  }

  render() {
    return (
      <div>
        <Greeting name={this.state.name} />
      </div>
    );
  }
}

export default App;
