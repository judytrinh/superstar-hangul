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
    if (event.keyCode !== SummaryScreen.ENTER_KEY) {
      return;
    }
    const { resetToFirstScreen } = this.props;
    resetToFirstScreen();
  };

  render() {
    const { name } = this.state;
    const { summaryInfo } = this.props;
    return (
      <div id="summary-screen">
        Number of words correct is
        <div id="word-count"> {summaryInfo}
        </div>
      </div>

    );
  }
}

SummaryScreen.ENTER_KEY = 13;

SummaryScreen.propTypes = {
  resetToFirstScreen: PropTypes.func.isRequired,
  summaryInfo: PropTypes.number,
};

SummaryScreen.defaultProps = {
  summaryInfo: 0,
}