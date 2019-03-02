import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Contains the translation, lyric, and text input. Handles text input
 * validation and visual feedback to the user.
 */
export default class LyricEntry extends Component {
  state = { name: 'lyric entry' };

  render() {
    const { name } = this.state;
    const { translation, lyric } = this.props;
    return (
      <div className="lyric-entry">
        {name}
        <div>{translation}</div>
        <div>{lyric}</div>
      </div>
    );
  }
}

LyricEntry.propTypes = {
  translation: PropTypes.string.isRequired,
  lyric: PropTypes.string,
};

LyricEntry.defaultProps = {
  lyric: '',
};
