import React, { Component } from "react";
import "../stylesheets/common.scss";

export default class CharacterComponent extends Component {
  componentWillMount() {
    this.username = localStorage.getItem("username");
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const props = this.props;

    const words = state.words;
    const wordsOnScreen = words.onScreen;

    const word = props.word;
    const splitWord = props.splitWord;

    const buffer = state.buffer[this.username];
    const lettersTyped = buffer.letters;
    const wordTyped = buffer.word;

    return (
      <span className={wordsOnScreen[word][wordTyped] && lettersTyped[splitWord]
        ? 'typed character'
        : 'character'} >
        {this.props.character}
      </span>
    )
  }
}

CharacterComponent.contextTypes = {
	store: React.PropTypes.object
}
