import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Introductory screen when the user starts the game.
 */
export default class HomeScreen extends Component {
  componentDidMount() {
    document.addEventListener('click', this.onClickAndKeyDown, false);
    document.addEventListener('keydown', this.onClickAndKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickAndKeyDown, false);
    document.removeEventListener('keydown', this.onClickAndKeyDown);
  }

  onClickAndKeyDown = () => {
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

HomeScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
