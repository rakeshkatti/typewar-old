import React, { Component } from "react";
import WordOnScreen from "./WordOnScreen";

export default class GameContainer extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    window.addEventListener('keydown', this.keyPressed.bind(this));
    this.username = localStorage.getItem("username");
  }
  componentWillUnmount() {
    this.unsubscribe();
    window.removeEventListener('keydown', this.keyPressed.bind(this));
  }

  keyPressed(e) {
    const characterTyped = String.fromCharCode(e.keyCode)
    store.dispatch({type:"ADD_CHARACTER", character:characterTyped, username: this.username})
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    return (
      <div>
        {Object.keys(state.words.onScreen).map((word, i) => {
          return (
            <div key = {i}>
              <WordOnScreen word={word} />
            </div>
          )
        })}
      </div>
    )
  }
}

GameContainer.contextTypes = {
	store: React.PropTypes.object
}
