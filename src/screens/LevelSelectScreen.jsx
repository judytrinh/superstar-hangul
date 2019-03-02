import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  constructor() {
    super();

    this.state = { name: 'level select screen' };
  }

  // TODO: Remove componentDidMount, componentWillUnmount, onKeyDown
  // when we've actually hooked up the proper condition to move to next screen.
  // This is here to be able to test cycling through screens for now.
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode !== LevelSelectScreen.ENTER_KEY
        && event.keyCode !== LevelSelectScreen.SPACE_KEY) {
      return;
    }
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  render() {
    const { name } = this.state;
    return (
      <div id="level-select-screen">
        {name}
      </div>
    );
  }
}

LevelSelectScreen.ENTER_KEY = 13;
LevelSelectScreen.SPACE_KEY = 32;

LevelSelectScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
