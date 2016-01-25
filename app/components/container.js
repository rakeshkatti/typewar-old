import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import {renderContainer} from "./renderContainer"
import io from "socket.io-client";

var socket = io('http://localhost:8000');

export default React.createClass({
	componentWillMount() {
		this.store = this.props.store
	},
	onUpdate(e) {
		renderContainer(e.target.value);
		socket.emit("receive", {message: e.target.value});
	},
	render() {
		this.store.dispatch({type: "ADD_ON_SCREEN", word: "DAM"});
		return (
			<div>
				<p>Session: {localStorage.getItem("username")}</p>
				<Login />
			</div>
			);
	}
});
