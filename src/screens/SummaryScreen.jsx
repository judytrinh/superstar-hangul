import React, { Component } from 'react';

/**
 * Summary of game results.
 */
export default class SummaryScreen extends Component {
  state = { name: 'summary screen' };

  render() {
    const { name } = this.state;
    return (
      <div id="summary-screen">
        {name}
      </div>
    );
  }
}
