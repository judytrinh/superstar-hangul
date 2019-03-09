import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Summary of game results.
 */
export default class SummaryScreen extends Component {
  state = { name: 'summary screen' };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode !== SummaryScreen.ENTER_KEY
        && event.keyCode !== SummaryScreen.SPACE_KEY) {
      return;
    }
    const { resetToFirstScreen } = this.props;
    resetToFirstScreen();
  };

  render() {
    const { name } = this.state;
    return (
      <div id="summary-screen">
        {name}
      </div>
    );
  }
}

SummaryScreen.ENTER_KEY = 13;
SummaryScreen.SPACE_KEY = 32;

SummaryScreen.propTypes = {
  resetToFirstScreen: PropTypes.func.isRequired,
};
