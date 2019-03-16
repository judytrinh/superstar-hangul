import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, CardImg, CardTitle, CardDeck, CardBody,
} from 'reactstrap';
import songData from './hugMeData';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  constructor() {
    super();
    this.songInfo = { audioFile: '', parts: [] };
  }

  // Puts JSON data into songInfo to be passed to new GameplayScreen
  componentDidMount() {
    // songInfo contains an array of objects
    this.songInfo = {
      audioFile: 'src/audio/BTS V _ J-HOPE - HUG ME 안아줘.mp3',
      parts:
        songData.map(songInfo => ({
          line: songInfo.line,
          lyric: songInfo.korean,
          translation: songInfo.english,
          duration: Number(new Date(songInfo.stop)) - Number(new Date(songInfo.start)),
        })),
    };
  }

  render() {
    const { moveToGameplayScreen } = this.props;

    return (
      <div id="level-select-screen">

        <h5>Choose a song.</h5>
        <br />
        <CardDeck>
          <Card>
            <CardImg top width="100%" src="src/images/hugMe.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>V, J-hope - 안아줘 (Hug me)</CardTitle>
              <Button outline color="info" onClick={() => moveToGameplayScreen(this.songInfo)}>Easy</Button>
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

LevelSelectScreen.propTypes = {
  moveToGameplayScreen: PropTypes.func.isRequired,
};
