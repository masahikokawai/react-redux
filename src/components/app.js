import React, { Component } from 'react';

import Greeting from './greeting'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'DEF',
    }
  }

  handleNameChange(name) {
    console.log(name);
    this.setState({ name });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.handleNameChange(e.target.value)}
        />
        <Greeting name={this.state.name} />
      </div>
    );
  }
}

export default App;
