import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import {renderContainer} from "./renderContainer"
import io from "socket.io-client";
import Header from "./Header";
import Footer from "./Footer";

var socket = io('http://localhost:8000');

export default class extends Component {
	componentWillMount() {
		this.store = this.props.store
	}
	onUpdate(e) {
		renderContainer(e.target.value);
		socket.emit("receive", {message: e.target.value});
	}
	render() {
		this.store.dispatch({type: "ADD_ON_SCREEN", word: "DAM"});
		return (
			<div>
				<Header />
				<p>Session: {localStorage.getItem("username")}</p>
				<Login />
				<Footer />
			</div>
			);
	}
};
