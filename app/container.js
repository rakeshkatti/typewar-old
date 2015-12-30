import React from "react";
import ReactDOM from "react-dom";
import InputComponent from "./inputComponent";
import {renderContainer} from "./renderContainer"
import io from "socket.io-client";

var socket = io('http://localhost:8000');

export default React.createClass({
	onUpdate(e) {
		renderContainer(e.target.value);
		socket.emit("receive", {message: e.target.value});
	},
	render: function() {
		return (
			<div className="greeting">
			<h1>Hello, {this.props.name}!</h1>
			<InputComponent onUpdate={this.onUpdate} />
			</div>
			);
	}
});