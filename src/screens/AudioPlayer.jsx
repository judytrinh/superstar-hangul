import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
  }

  audio = new Audio("audio/BTS V _ J-HOPE - HUG ME 안아줘.mp3");

  render() {
    return (
      audio = new Audio(this.props.audio)
    );
  }
}