import React, { Component } from 'react';

import Greeting from './greeting'

class App extends Component {
  render() {
    return (
      <div>
        <Greeting name="ABC" />
        <Greeting name="DEF" />
      </div>
    );
  }
}

export default App;
