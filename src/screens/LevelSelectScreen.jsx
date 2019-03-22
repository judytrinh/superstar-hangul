import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, CardImg, CardTitle, CardDeck, CardBody,
} from 'reactstrap';
import songDataList from './songData';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  constructor() {
    super();
    this.songInfoList = [{ audioFile: '', parts: [] }, { audioFile: '', parts: [] }];
  }

//  // Puts JSON data into songInfo to be passed to new GameplayScreen
//  componentDidMount() {
//    // songInfo contains an array of objects
//    this.songInfo = {
//      audioFile: 'src/audio/BTS V _ J-HOPE - HUG ME 안아줘.mp3',
//      parts:
//        songData.map(songInfo => ({
//          line: songInfo.line,
//          lyric: songInfo.korean,
//          translation: songInfo.english,
//          duration: Number(new Date(songInfo.stop)) - Number(new Date(songInfo.start)),
//        })),
//    };
//  }
  
  
  
    // Puts JSON data into songInfo to be passed to new GameplayScreen
  componentDidMount() {
    // songInfo contains an array of objects
    console.log(songDataList[1]);
    this.songInfoList = [
      {
        audioFile: 'src/audio/BTS V _ J-HOPE - HUG ME 안아줘.mp3',
        parts:
          songDataList[0].map(songInfoList => ({
            line: songInfoList.line,
            lyric: songInfoList.korean,
            translation: songInfoList.english,
            duration: Number(new Date(songInfoList.stop)) - Number(new Date(songInfoList.start)),
          })),
      },
      {
        audioFile: 'src/audio/IU-palette.mp3',
        parts:
          songDataList[1].map(songInfoList => ({
            line: songInfoList.line,
            lyric: songInfoList.korean,
            translation: songInfoList.english,
            duration: Number(new Date(songInfoList.stop)) - Number(new Date(songInfoList.start)),
          })),
      },
      {
        audioFile: 'src/audio/Taemin-Move.mp3',
        parts:
          songDataList[2].map(songInfoList => ({
            line: songInfoList.line,
            lyric: songInfoList.korean,
            translation: songInfoList.english,
            duration: Number(new Date(songInfoList.stop)) - Number(new Date(songInfoList.start)),
          })),
      }
    ];
    console.log(this.songInfoList);
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
              <Button outline color="info" onClick={() => moveToGameplayScreen(this.songInfoList[0])}>Easy</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/palette.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>IU - Palette</CardTitle>
              <Button outline color="info" onClick={() => moveToGameplayScreen(this.songInfoList[1])}>Medium</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/move.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>Taemin - MOVE</CardTitle>
              <Button outline color="info" onClick={() => moveToGameplayScreen(this.songInfoList[2])}>Hard</Button>
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
