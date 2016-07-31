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

    let  className = "character";
    state.users.forEach((user, i) => {
      let buffer = state.buffer[user];
      let lettersTyped = buffer.letters;
      let wordTyped = buffer.word;
      if (wordsOnScreen[word][wordTyped] && lettersTyped[splitWord]) {
        className += " user" + parseInt(i);
      }
    });

    return (
        <span className={className} >
        {this.props.character}
      </span>
    )

  }
}

CharacterComponent.contextTypes = {
	store: React.PropTypes.object
};
