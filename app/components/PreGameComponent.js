import React, {Component} from "react";
import io from "socket.io-client";

var socket = io('http://localhost:8000');

export default class PreGameComponent extends Component {
    startGame() {
        socket.emit('startGame', {
            userId: localStorage.getItem("username")
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.startGame.bind(this)}>Start Game</button>
            </div>
        )
    }
}