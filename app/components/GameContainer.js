import React, { Component } from "react";
import WordOnScreen from "./WordOnScreen";
import PreGameComponent from "./PreGameComponent";
import io from "socket.io-client";

var socket = io('http://localhost:8000');

export default class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.keyPressed = this.keyPressed.bind(this);
    }
    
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        window.addEventListener('keydown', this.keyPressed);
        this.username = localStorage.getItem("username");
    }
    
    componentWillUnmount() {
        this.unsubscribe();
        window.removeEventListener('keydown', this.keyPressed);
    }
    
    keyPressed(e) {
        e.preventDefault();
        const {store} = this.context;
        const state          = store.getState();
        const letters        = state.letters;
        const words          = state.words;
        const buffer         = state.buffer;
        const wordTyped      = buffer[this.username].word;
        const characterTyped = String.fromCharCode(e.keyCode);
        const currentWord    = wordTyped + characterTyped;
        if (letters[currentWord]) {
            let dispatcher = {type: "ADD_CHARACTER", character: characterTyped, username: this.username};
            store.dispatch(dispatcher);
            socket.emit('dispatch', dispatcher);
            if (words.onScreen[currentWord]) {
                let dispatcher = {type: "REMOVE_FROM_SCREEN", word: currentWord};
                store.dispatch(dispatcher);
                socket.emit('dispatch', dispatcher);
                dispatcher = {type: "COMPLETED_WORD", word: currentWord, username: this.username};
                store.dispatch(dispatcher);
                socket.emit('dispatch', dispatcher);
            }
        } else {
            store.dispatch({type: "REMOVE_FROM_BUFFER", username: this.username});
            store.dispatch({type: "ADD_CHARACTER", character: characterTyped, username: this.username})
        }
    }
    
    render() {
        const {store} = this.context;
        const state = store.getState();
        if (Object.keys(state.words.onScreen).length > 0) {
            return (
                <div>
                    {Object.keys(state.words.onScreen).map((word, i) => {
                        return (
                            <div key={i}>
                                <WordOnScreen word={word}/>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <PreGameComponent />
                </div>
            )
        }
    }
}

GameContainer.contextTypes = {
    store: React.PropTypes.object
};
