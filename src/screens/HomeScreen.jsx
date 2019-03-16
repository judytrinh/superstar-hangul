import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * Introductory screen when the user starts the game.
 */
export default class HomeScreen extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode !== HomeScreen.ENTER_KEY) {
      return;
    }
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  continue = () => {
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  render() {
    return (
      <div id="home-screen">
        <br />

        <div id="start-info">Superstar Hangul is a typing game that tests your Korean touch typing skills. Type the lyrics you see on the screen as fast as you can. Are you 준비?</div>

        <div id="sample-game" className="lyric-entry">
          <h2 className="sample-text">내게 말해줘 이게 사랑이라면</h2>
          <h6 className="sample-text">Tell me if this is love</h6>
          <br />

          <div className="cursor">
            <input type="text" placeholder="Type what you see" />
          </div>

        </div>

        <br />
        <br />
        <br />
        <Button outline color="info" onClick={this.continue}>Choose a Song to Begin</Button>
      </div>
    );
  }
}

/**
 * Class constants
 */
HomeScreen.ENTER_KEY = 13;

HomeScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
