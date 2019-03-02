import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LyricEntry from './LyricEntry';

/**
 * Where the actual gameplay happens. Houses the game logic, typing view, etc.
 */
export default class GameplayScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentTranslation: 'Tell me if this is love',
      currentLyric: '내게 말해줘 이게 사랑이라면',
    };
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
    if (event.keyCode !== GameplayScreen.ENTER_KEY
        && event.keyCode !== GameplayScreen.SPACE_KEY) {
      return;
    }
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  // TODO: once we nail down how the lyric + translation data will be stored,
  // we should use that to populate the next set of lyrics
  moveToNextLyric = () => {
    this.setState({
      currentTranslation: 'Sharing and learning countless emotions everyday with you',
      currentLyric: '매일 그대와 수많은 감정들을 나눠주고 배워가며',
    });
  };

  render() {
    const { currentTranslation, currentLyric } = this.state;
    return (
      <div id="gameplay-screen">
        <LyricEntry
          moveToNextLyric={this.moveToNextLyric}
          translation={currentTranslation}
          lyric={currentLyric}
        />
      </div>
    );
  }
}

GameplayScreen.ENTER_KEY = 13;
GameplayScreen.SPACE_KEY = 32;

GameplayScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
