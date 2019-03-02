import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Introductory screen when the user starts the game.
 */
export default class HomeScreen extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode !== HomeScreen.ENTER_KEY
        && event.keyCode !== HomeScreen.SPACE_KEY) {
      return;
    }
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  render() {
    return (
      <div id="home-screen">
        <h2>Press any key to start</h2>
        <div>[시작]</div>
      </div>
    );
  }
}

/**
 * Class constants
 */
HomeScreen.ENTER_KEY = 13;
HomeScreen.SPACE_KEY = 32;

HomeScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
