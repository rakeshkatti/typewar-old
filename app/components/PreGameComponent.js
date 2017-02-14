import React, {Component} from "react";
import io from "socket.io-client";

var socket = io('http://localhost:8000');

export default class PreGameComponent extends Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }
    
    startGame() {
        socket.emit('startGame', {
            userId: localStorage.getItem("username")
        });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.startGame}>Start Game</button>
            </div>
        )
    }
}