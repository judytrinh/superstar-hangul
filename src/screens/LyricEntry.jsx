import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Contains the translation, lyric, and text input. Handles text input
 * validation and visual feedback to the user.
 */
export default class LyricEntry extends Component {
  static tokenizeLyric(lyric) {
    // regex that allows all number of whitespaces between to be omitted from
    // the tokenization
    return lyric.split(/\s+/);
  }

  constructor(props) {
    super(props);

    this.state = {
      correctInput: '',
      editableInput: '',
      // index in this.lyricWordGroups of group that user needs to type correctly next
      currWordGroupIndex: 0,
    };

    this.correctInputGroups = [];
    const { lyric } = props;
    this.lyricWordGroups = LyricEntry.tokenizeLyric(lyric);
  }

  // TODO: Remove both of these event listener sub/unsub calls when we actually
  // implement moving to next set of lyrics after validation.
  componentDidMount() {
    document.addEventListener('click', this.validateInput, false);
    this.autoProgress();
  }

  componentDidUpdate(prevProps) {
    this.autoProgress();

    // If the lyric prop updated, re-parse out the word groups
    const { lyric } = this.props;
    if (lyric !== prevProps.lyric) {
      this.lyricWordGroups = LyricEntry.tokenizeLyric(lyric);
      this.resetState();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.validateInput, false);
  }

  // Call this every time the input changes to validate whether the user has
  // successfully typed the whole lyric
  // TODO: remove this when we no longer need auto progress for development
  validateInput = () => {
    const { moveToNextLyric } = this.props;
    moveToNextLyric();
  };

  // TODO: account for skipping english word groups
  validateInputAndAddFeedback = () => {
    const { editableInput, currWordGroupIndex } = this.state;

    if (currWordGroupIndex >= this.lyricWordGroups.length) {
      console.error('Attempting to access word group index out of bounds. Should have proceeded to next set of lyrics by now.');
      return;
    }

    const currWordGroup = this.lyricWordGroups[currWordGroupIndex];

    if (currWordGroup !== editableInput) {
      // Incorrect input so far, will not mark as valid
      return;
    }

    // Input word group was correct, so we now reconstruct the green "valid"
    // displayed string and update that, as well as remove that word group from
    // the editable input.
    this.correctInputGroups.push(currWordGroup);
    const correctInputString = this.correctInputGroups.join(' ');
    this.setState({ correctInput: correctInputString });
    this.setState({ editableInput: editableInput.substring(currWordGroup.length) });

    if (currWordGroupIndex === this.lyricWordGroups.length - 1) {
      const { moveToNextLyric } = this.props;
      moveToNextLyric();
    }
    this.setState({ currWordGroupIndex: currWordGroupIndex + 1 });
  };

  handleTypingInputChange = (e) => {
    this.setState({ editableInput: e.target.value });

    this.validateInputAndAddFeedback();
  };

  autoProgress() {
    const { duration } = this.props;
    setTimeout(this.validateInput, duration);
  }

  resetState() {
    this.setState({
      correctInput: '',
      editableInput: '',
      currWordGroupIndex: 0,
    });
    this.correctInputGroups = [];
  }

  render() {
    const { translation, lyric } = this.props;
    const { correctInput, editableInput } = this.state;

    return (
      <div className="lyric-entry">
        <h2 className="sample-text">{lyric}</h2>
        <h6 className="sample-text">{translation}</h6>
        <br />

        <div className="typing-input">
          <span className="correct-input">{correctInput}</span>
          <input
            type="text"
            value={editableInput}
            onChange={this.handleTypingInputChange}
          />
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
