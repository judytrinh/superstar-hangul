import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

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

  static hasEnglishChars(str) {
    const regex = /[A-Za-z]/;
    return regex.test(str);
  }

  // For each word group, round up all consecutive word groups following it that
  // are in the same language. Group them together into 1 string per consecutive
  // set in the language.
  // Ex. 재 이름 Judy 예요 => ['재 이름 ', 'Judy ', '예요 ']
  static convertWordGroupsToJsx(lyricWordGroups) {
    const lyricElements = [];
    let key = 0;
    for (let i = 0; i < lyricWordGroups.length;) {
      let str = '';
      let j;
      // For each consecutive set of language word groups, concatenate them
      // together into a single string to minimize number of DOM elements on the page.
      const hasEnglishChars = LyricEntry.hasEnglishChars(lyricWordGroups[i]);
      for (j = i; j < lyricWordGroups.length; j += 1) {
        if (hasEnglishChars !== LyricEntry.hasEnglishChars(lyricWordGroups[j])) {
          break;
        }
        str += `${lyricWordGroups[j]} `;
      }
      // Update the beginning index of the next language set's word groups.
      i = j;
      // Push the result as a span el with the class denoting the language.
      const lang = hasEnglishChars ? 'english' : 'korean';
      lyricElements.push(<span key={key} className={lang}>{str}</span>);
      key += 1;
    }
    return lyricElements;
  }

  constructor(props) {
    super(props);
    this.durationTimeout = null;

    this.state = {
      correctInput: '',
      editableInput: '',
      // index in this.lyricWordGroups of group that user needs to type correctly next
      currWordGroupIndex: 0,
      lyricElements: [],
      allcorrect: false,
    };

    this.correctInputGroups = [];
  }

  componentDidMount() {
    this.setUpNewLyric();
  }

  componentDidUpdate(prevProps) {
    // If the lyric prop updated, re-setup the input state for the new lyric
    const { line } = this.props;
    if (line !== prevProps.line) {
      this.setUpNewLyric();
    }
    this._input.focus();
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
    this.setState({ lyricElements: LyricEntry.convertWordGroupsToJsx(this.lyricWordGroups) });
  }

  // TODO: account for skipping english word groups
  validateInputAndAddFeedback = () => {
    const { editableInput, currWordGroupIndex, allcorrect} = this.state;

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
    if (currWordGroupIndex == this.lyricWordGroups.length - 1) {
      console.log("good job");
      this.setState({allcorrect: true});
    }
    this.updateVisualFeedback(currWordGroup);
    this.setState({ currWordGroupIndex: currWordGroupIndex + 1 });
  };
  // TODO
  getInputClassName(){
    const { allcorrect } = this.state;
    if (allcorrect) {
      return "all-correct";
    }
    return "correct-input";
  }

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
    const { duration, moveToNextLyric } = this.props;
    this.durationTimeout = setTimeout(moveToNextLyric, duration);
  }

  resetState() {
    this.setState({
      correctInput: '',
      editableInput: '',
      currWordGroupIndex: 0,
      allcorrect: false,
    });
    this.correctInputGroups = [];
    ReactTestUtils.Simulate.keyDown(this._input, { key: 'Enter', keyCode: 13, which: 13 });
  }


  render() {
    const { translation } = this.props;
    const { correctInput, editableInput, lyricElements, allcorrect} = this.state;

    const correctInputSpan = correctInput !== '' ? (
      <span className= {this.getInputClassName()}>
        {correctInput}
        &nbsp;
      </span>
    ) : null;

    return (
      <div className="lyric-entry">
        <h2 className= {"sample-text"}>{lyricElements}</h2>
        <h6 className="sample-text">{translation}</h6>
        <br />
        <div className="typing-input cursor">
          {correctInputSpan}
          <div className={this.state.focused ? 'focused' : ''}>
            <input
              type="text"
              value={editableInput}
              onChange={this.handleTypingInputChange}
              autoFocus
              ref={(c) => { this._input = c; }}
            />
          </div>
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
