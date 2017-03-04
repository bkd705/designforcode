import React, { Component } from 'react';
import NavigationBar from './components/common/NavigationBar'

class App extends Component {
  render() {
    return (
      <div className="app">
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
