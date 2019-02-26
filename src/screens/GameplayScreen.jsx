import React, { Component } from 'react';

/**
 * Where the actual gameplay happens. Houses the game logic, typing view, etc.
 */
export default class GameplayScreen extends Component {
  state = { name: 'gameplay screen' };

  render() {
    const { name } = this.state;
    return (
      <div id="gameplay-screen">
        {name}
      </div>
    );
  }
}
