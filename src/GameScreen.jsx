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
    this.screenList = [
      <HomeScreen moveToNextScreen={this.moveToNextScreen} />,
      <LevelSelectScreen moveToNextScreen={this.moveToNextScreen} />,
      <GameplayScreen moveToNextScreen={this.moveToNextScreen} />,
      <SummaryScreen />,
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
    if (this.currentScreenIndex === this.screeList.length - 1) {
      return;
    }
    this.currentScreenIndex += 1;

    this.setState({ currentScreen: this.getCurrentScreen() });
  };

  resetToFirstScreen() {
    this.currentScreenIndex = 0;
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
