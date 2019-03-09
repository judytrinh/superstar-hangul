import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';
import GameplayScreen from './screens/GameplayScreen';
import SummaryScreen from './screens/SummaryScreen';

/**
 * Displays the current screen the user is on. Handles cycling between screens
 * and passing info between them.
 */
export default class GameScreen extends Component {
  constructor() {
    super();

    // When each component gets rendered during its turn, it mounts and
    // initializes at that moment. The moment each one gets "un-rendered",
    // it unmounts. This is quite unintuitive if you're thinking about it in an
    // object-oriented manner but we'll roll with it.
    this.screenList = [
      <HomeScreen moveToNextScreen={this.moveToNextScreen} />,
      <LevelSelectScreen moveToNextScreen={this.moveToNextScreen} showCurrentScreen={this.showCurrentScreen} />,
      <GameplayScreen moveToNextScreen={this.moveToNextScreen} />,
      <SummaryScreen resetToFirstScreen={this.resetToFirstScreen}/>,
    ];

    this.currentScreenIndex = 0;
    this.state = {
      currentScreen: this.getCurrentScreen(),
    };
  }

  getCurrentScreen() {
    return this.screenList[this.currentScreenIndex];
  }

  moveToNextScreen = () => {
    if (this.currentScreenIndex === this.screenList.length - 1) {
      return;
    }
    this.currentScreenIndex += 1;
    this.updateCurrentScreen();
  };

  resetToFirstScreen = () => {
    this.currentScreenIndex = 0;
    this.updateCurrentScreen();
  }

  updateCurrentScreen() {
    this.setState({ currentScreen: this.getCurrentScreen() });
  }

  showCurrentScreen = (screen) => {
    this.setState({currentScreen : screen });
  }

  render() {
    const { currentScreen } = this.state;
    return (
      <div id="game-screen">
        {currentScreen}
      </div>
    );
  }
}
