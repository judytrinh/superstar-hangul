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
    this.songLength = songInfo.parts.length;
    this.state = {
      currentLine: songInfo.parts[this.lyricIndex].line,
      currentLyric: songInfo.parts[this.lyricIndex].lyric,
      currentTranslation: songInfo.parts[this.lyricIndex].translation,
      currentDuration: songInfo.parts[this.lyricIndex].duration,
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
    if (event.keyCode !== GameplayScreen.ENTER_KEY) {
      return;
    }
    const { moveToSummaryScreen } = this.props;
    moveToSummaryScreen();
  };

  continue = () => {
    const { moveToSummaryScreen } = this.props;
    moveToSummaryScreen();
  };

  moveToNextLyric = () => {
    // if we're not on the last line, increase line index by 1
    if (this.lyricIndex >= this.songLength - 1) {
      this.continue();
    } else {
      this.lyricIndex += 1;
      const { songInfo } = this.props;
      this.setState({
        currentLine: songInfo.parts[this.lyricIndex].line,
        currentLyric: songInfo.parts[this.lyricIndex].lyric,
        currentTranslation: songInfo.parts[this.lyricIndex].translation,
        currentDuration: songInfo.parts[this.lyricIndex].duration,
      });
    }
  };

  render() {
    const { currentLine, currentTranslation, currentLyric, currentDuration } = this.state;
    const { songInfo } = this.props;
    return (
      <div id="gameplay-screen">
        <audio autoPlay>
          <source src={songInfo.audioFile} type="audio/mpeg" />
        </audio>
        <LyricEntry
          moveToNextLyric={this.moveToNextLyric}
          line={currentLine}
          translation={currentTranslation}
          lyric={currentLyric}
          duration={currentDuration}
        />
      </div>
    );
  }
}

GameplayScreen.ENTER_KEY = 13;

GameplayScreen.propTypes = {
  moveToSummaryScreen: PropTypes.func.isRequired,
  songInfo: PropTypes.instanceOf(Object).isRequired,
};
