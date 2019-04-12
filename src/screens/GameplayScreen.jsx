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
    const { parts } = this.props;
    this.songLength = parts.length;
    this.state = {
      currentLine: parts[this.lyricIndex].line,
      currentLyric: parts[this.lyricIndex].lyric,
      currentTranslation: parts[this.lyricIndex].translation,
      currentDuration: parts[this.lyricIndex].duration,
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
      const { parts } = this.props;
      this.setState({
        currentLine: parts[this.lyricIndex].line,
        currentLyric: parts[this.lyricIndex].lyric,
        currentTranslation: parts[this.lyricIndex].translation,
        currentDuration: parts[this.lyricIndex].duration,
      });
    }
  };

  render() {
    const {
      currentLine, currentTranslation, currentLyric, currentDuration,
    } = this.state;
    const { songMetadata } = this.props;
    return (
      <div id="gameplay-screen">
        <audio autoPlay>
          <track kind="captions" />
          <source src={songMetadata.audioFile} type="audio/mpeg" />
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
  songMetadata: PropTypes.instanceOf(Object).isRequired,
};
