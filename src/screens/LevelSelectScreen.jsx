import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, CardImg, CardTitle, CardDeck, CardBody,
} from 'reactstrap';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
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
};
