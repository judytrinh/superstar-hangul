import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LyricEntry from './LyricEntry';

/**
 * Where the actual gameplay happens. Houses the game logic, typing view, etc.
 */
export default class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    this.lyricIndex = 0;
    const { songInfo } = this.props;
    this.songLength = songInfo.length;
    this.state = {
      currentLyric: songInfo[this.lyricIndex].props.lyric,
      currentTranslation: songInfo[this.lyricIndex].props.translation,
      currentDuration: songInfo[this.lyricIndex].props.duration,
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

  continue = () => {
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  // TODO: once we nail down how the lyric + translation data will be stored,
  // we should use that to populate the next set of lyrics
  moveToNextLyric = () => {
    // if we're not on the last line, increase line index by 1
    if (this.lyricIndex >= this.songLength - 1) {
      this.continue();
    } else {
      this.lyricIndex += 1;
      const { songInfo } = this.props;
      this.setState({
        currentLyric: songInfo[this.lyricIndex].props.lyric,
        currentTranslation: songInfo[this.lyricIndex].props.translation,
        currentDuration: songInfo[this.lyricIndex].props.duration,
      });
    }
  };

  render() {
    const { currentTranslation, currentLyric, currentDuration } = this.state;
    return (
      <div id="gameplay-screen">
        <LyricEntry
          moveToNextLyric={this.moveToNextLyric}
          translation={currentTranslation}
          lyric={currentLyric}
          duration={currentDuration}
        />
      </div>
    );
  }
}

GameplayScreen.ENTER_KEY = 13;
GameplayScreen.SPACE_KEY = 32;

GameplayScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
  songInfo: PropTypes.instanceOf(Array).isRequired,
};
