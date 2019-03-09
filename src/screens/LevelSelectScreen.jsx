import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, CardImg, CardTitle, CardDeck, CardBody,
} from 'reactstrap';
import songData from './hugMeData';
import LyricEntry from './LyricEntry';
import GameplayScreen from './GameplayScreen'


/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  // TODO: Remove componentDidMount, componentWillUnmount, onKeyDown
  // when we've actually hooked up the proper condition to move to next screen.
  // This is here to be able to test cycling through screens for now.
  
  constructor() {
    super();
    this.songInfo = [];
    this.State = {
      songInfo: []
    }
    
  }
  
  //Puts JSON data into songInfo to be passed to new GameplayScreen
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    //songInfo is an array of LyricEntry components
    this.songInfo = songData.map((songInfo, key) => {
      return (
        <LyricEntry
          lyric={songInfo.korean}
          translation={songInfo.english}
        />
      )
    })
    this.setState({songInfo: this.songInfo}); 


  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode !== LevelSelectScreen.ENTER_KEY
        && event.keyCode !== LevelSelectScreen.SPACE_KEY) {
      return;
    }
    const { showCurrentScreen } = this.props;
    let screen = <GameplayScreen moveToNextScreen={this.props.moveToNextScreen} songInfo={this.songInfo}/>
    showCurrentScreen(screen);
  };


  render() {
    return (
      <div id="level-select-screen">

        <h5>Choose a song.</h5>
        <br />
        <CardDeck>
          <Card>
            <CardImg top width="100%" src="src/images/hugMe.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>V, J-hope - 안아줘 (Hug me)</CardTitle>
              <Button outline color="info">Easy</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/laVieEnRose.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>IZ*ONE - La Vie en Rose</CardTitle>
              <Button outline color="info">Medium</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/babyDontStop.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>NCT U - Baby Don&apos;t Stop</CardTitle>
              <Button outline color="info">Hard</Button>
            </CardBody>
          </Card>
        </CardDeck>

      </div>
    );
  }
}

LevelSelectScreen.ENTER_KEY = 13;
LevelSelectScreen.SPACE_KEY = 32;

LevelSelectScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
  showCurrentScreen: PropTypes.func.isRequired
};
