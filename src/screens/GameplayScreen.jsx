import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LyricEntry from './LyricEntry';

/**
 * Where the actual gameplay happens. Houses the game logic, typing view, etc.
 */
export default class GameplayScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.songInfo[0].props.translation);
    this.lyricIndex = 0;
    this.songLength = this.props.songInfo.length; 
    this.state = {
//      currentTranslation: this.props.songInfo[lyricIndex].translation,
      currentLyric: this.props.songInfo[this.lyricIndex].props.lyric,
      currentTranslation: this.props.songInfo[this.lyricIndex].props.translation,
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
  }




  // TODO: once we nail down how the lyric + translation data will be stored,
  // we should use that to populate the next set of lyrics
  moveToNextLyric = () => {
    //if we're not on the last line, increase line index by 1
    console.log("lyricIndex="+this.lyricIndex);
    console.log("songLength="+this.songLength);
    if (this.lyricIndex >= this.songLength-1){
      this.continue();
      console.log("time to change mf");

    }
    else{
      this.lyricIndex +=1;
      this.setState({
      currentLyric: this.props.songInfo[this.lyricIndex].props.lyric,
      currentTranslation: this.props.songInfo[this.lyricIndex].props.translation,
    });
    }
    
    
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
  songInfo: PropTypes.array.isRequired
};
