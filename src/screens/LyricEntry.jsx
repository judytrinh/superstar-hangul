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
    this.durationTimeout = null;

    this.state = {
      correctInput: '',
      editableInput: '',
      // index in this.lyricWordGroups of group that user needs to type correctly next
      currWordGroupIndex: 0,
    };

    this.correctInputGroups = [];
  }

  componentDidMount() {
    this.setUpNewLyric();
  }

  componentDidUpdate(prevProps) {
    // If the lyric prop updated, re-parse out the word groups
    const { line } = this.props;
    if (line !== prevProps.line) {
      this.setUpNewLyric();
    }
  }

  componentWillUnmount() {
    if (this.durationTimeout !== null) {
      clearTimeout(this.durationTimeout);
    }
  }

  setUpNewLyric() {
    const { lyric } = this.props;
    this.lyricWordGroups = LyricEntry.tokenizeLyric(lyric);
    this.resetState();
    this.autoProgress();
  }

  // TODO: account for skipping english word groups
  validateInputAndAddFeedback = () => {
    const { editableInput, currWordGroupIndex } = this.state;

    if (currWordGroupIndex >= this.lyricWordGroups.length) {
      // Attempting to access word group index out of bounds.
      // Should have proceeded to next set of lyrics by now.
      return;
    }

    const currWordGroup = this.lyricWordGroups[currWordGroupIndex];
    if (currWordGroup !== editableInput) {
      // Incorrect input so far, will not mark as valid
      return;
    }
    this.updateVisualFeedback(currWordGroup);
    this.setState({ currWordGroupIndex: currWordGroupIndex + 1 });
  };

  // Input word group was correct, so we now reconstruct the green "valid"
  // displayed string and update that, as well as remove that word group from
  // the editable input.
  updateVisualFeedback = (currWordGroup) => {
    this.correctInputGroups.push(currWordGroup);
    const correctInputString = this.correctInputGroups.join(' ');
    const { editableInput } = this.state;
    this.setState({
      correctInput: correctInputString,
      editableInput: editableInput.substring(currWordGroup.length),
    });
  };

  handleTypingInputChange = (e) => {
    this.setState({ editableInput: e.target.value });

    this.validateInputAndAddFeedback();
  };

  autoProgress() {
    const { duration } = this.props;
    const { moveToNextLyric } = this.props;
    this.durationTimeout = setTimeout(moveToNextLyric, duration);
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

    const correctInputSpan = correctInput !== '' ? (
      <span className="correct-input">
        {correctInput}
        &nbsp;
      </span>
    ) : null;

    return (
      <div className="lyric-entry">
        <h2 className="sample-text">{lyric}</h2>
        <h6 className="sample-text">{translation}</h6>
        <br />

        <div className="typing-input cursor">
          {correctInputSpan}
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
  // number order of the lyric
  line: PropTypes.number.isRequired,
  // how long to display lyric for
  duration: PropTypes.number.isRequired,
  // if in English, not required
  translation: PropTypes.string,
  lyric: PropTypes.string.isRequired,
  // Call this when we've validated that the user's input is correct
  moveToNextLyric: PropTypes.func.isRequired,
};

LyricEntry.defaultProps = {
  translation: '',
};
