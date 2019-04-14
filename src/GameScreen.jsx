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
      { name: 'Home', screen: <HomeScreen moveToNextScreen={this.moveToNextScreen} /> },
      { name: 'LevelSelect', screen: <LevelSelectScreen moveToGameplayScreen={this.moveToGameplayScreen} /> },
      { name: 'Gameplay', screen: null }, // null screen means it needs to be reconstructed from data available from previous screens / realtime
      { name: 'Summary', screen: null },
    ];

    this.currentScreenIndex = 0;
    this.state = {
      currentScreen: this.getCurrentScreen(),
    };
  }

  getCurrentScreen() {
    return this.screenList[this.currentScreenIndex].screen;
  }

  // TODO: consider fetching via name and not index for future proofing.
  // shouldn't be too costly given the number of screens.
  // fetching songMetadata and returns the json, sets fields for parts
  moveToGameplayScreen = (songMetadata) => {
    if (this.currentScreenIndex !== 1) { return; }
    fetch(songMetadata.dataFile)
      // fetches parts: an array of objects with info of each song
      .then(data => data.json())
      .then((songParts) => {
        songParts.forEach((part) => {
          const songPart = part;
          songPart.duration = Number(new Date(part.stop)) - Number(new Date(part.start));
          songPart.lyric = part.korean;
          songPart.translation = part.english;
        });
        this.screenList[2].screen = (
          <GameplayScreen
            moveToSummaryScreen={this.moveToSummaryScreen}
            songMetadata={songMetadata}
            songParts={songParts}
          />
        );
        this.moveToNextScreen();
      });
  };

  // TODO: actually pass some real summaryInfo when we get there
  moveToSummaryScreen = (summaryInfo) => {
    if (this.currentScreenIndex !== 2) { return; }
    this.screenList[3].screen = (
      <SummaryScreen resetToFirstScreen={this.resetToFirstScreen} summaryInfo={summaryInfo} />
    );
    this.moveToNextScreen();
  };

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
  };

  updateCurrentScreen() {
    this.setState({ currentScreen: this.getCurrentScreen() });
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
