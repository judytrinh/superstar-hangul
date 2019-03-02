import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';
import GameScreen from './GameScreen';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Superstar Hangul',
      currentScreen: <GameScreen />,
    };
  }

  render() {
    const { name, currentScreen } = this.state;
    return (
      <div className="App">
        <h1>
          <br />
          {name}
        </h1>
        {currentScreen}
      </div>

    );
  }
}

export default hot(module)(App);
