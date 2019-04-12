import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, CardImg, CardTitle, CardDeck, CardBody,
} from 'reactstrap';
import songMetadata from '../../data/songMetadata.json'


/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  constructor() {
    super();
  }

//TODO: Loop through songs, make function that creates card
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
              <Button outline color="info" onClick={() => moveToGameplayScreen(songMetadata[0])}>Easy</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/palette.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>IU - Palette</CardTitle>
              <Button outline color="info" onClick={() => moveToGameplayScreen(songMetadata[1])}>Medium</Button>
            </CardBody>
          </Card>

          <Card>
            <CardImg top width="100%" src="src/images/move.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>Taemin - MOVE</CardTitle>
              <Button outline color="info" onClick={() => moveToGameplayScreen(songMetadata[2])}>Hard</Button>
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
