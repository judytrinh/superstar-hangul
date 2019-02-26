import React, { Component } from 'react';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  state = { name: 'level select screen' };

  render() {
    const { name } = this.state;
    return (
      <div id="level-select-screen">
        {name}
      </div>
    );
  }
}
