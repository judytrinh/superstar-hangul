import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';


/**
 * Introductory screen when the user starts the game.
 */
export default class HomeScreen extends Component {
  componentDidMount() {
    document.addEventListener('click', this.onClickAndKeyDown, false);
    document.addEventListener('keydown', this.onClickAndKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickAndKeyDown, false);
    document.removeEventListener('keydown', this.onClickAndKeyDown);
  }

  onClickAndKeyDown = () => {
    const { moveToNextScreen } = this.props;
    moveToNextScreen();
  };

  render() {
    return (
      <div id="home-screen">
        <h2>Superstar Hangul is a typing game that tests your Korean touch typing skills. Type the lyrics you see on the screen as fast as you can. Are you 준비?</h2>
        <Button color="secondary">Press any key to start</Button>
      </div>
    );
  }
}

HomeScreen.propTypes = {
  moveToNextScreen: PropTypes.func.isRequired,
};
