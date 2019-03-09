import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Contains the translation, lyric, and text input. Handles text input
 * validation and visual feedback to the user.
 */
export default class LyricEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: Remove both of these event listener sub/unsub calls when we actually
  // implement moving to next set of lyrics after validation.
  componentDidMount() {
    document.addEventListener('click', this.validateInput, false);
    this.autoProgress();
  }

  componentDidUpdate() {
    this.autoProgress();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.validateInput, false);
  }

  // Call this every time the input changes to validate whether the user has
  // successfully typed the whole lyric
  validateInput = () => {
    const { moveToNextLyric } = this.props;
    // TODO: Do some validation
    const valid = true;
    if (valid) {
      moveToNextLyric();
    }
  };

  autoProgress() {
    const { duration } = this.props;
    setTimeout(this.validateInput, duration);
  }

  render() {
    const { translation, lyric } = this.props;
    return (
      <div id="lyric-entry">
        <h2 className="sample-text">{lyric}</h2>
        <h6 className="sample-text">{translation}</h6>
        <br />

        <div className="cursor">
          <input type="text" placeholder="Type what you see" />
        </div>
      </div>
    );
  }
}

LyricEntry.propTypes = {
  // how long to display lyric for
  duration: PropTypes.number.isRequired,
  // if in English, not required
  translation: PropTypes.string,
  lyric: PropTypes.string.isRequired,
  // Call this when we've validated that the user's input is correct
  moveToNextLyric: PropTypes.func,
};

LyricEntry.defaultProps = {
  translation: '',
  moveToNextLyric: () => { },
};
