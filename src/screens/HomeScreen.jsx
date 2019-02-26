import React, { Component } from 'react';

/**
 * Introductory screen when the user starts the game.
 */
export default class HomeScreen extends Component {
  state = { name: 'home screen' };

  render() {
    const { name } = this.state;
    return (
      <div id="home-screen">
        {name}
      </div>
    );
  }
}
