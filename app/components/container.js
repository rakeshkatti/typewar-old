import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import {renderContainer} from "./renderContainer"
import io from "socket.io-client";
import Header from "./Header";
import MainContainer from "./MainContainer";
import Footer from "./Footer";

var socket = io('http://localhost:8000');

export default class Container extends Component {
	componentDidMount() {
		const { store } = this.context;
		store.dispatch({type:"ADD_USER", username:"katti"});
		localStorage.setItem("username", "katti");
		store.dispatch({type:"ADD_ON_SCREEN", word:"DETERMINATION"})
		store.dispatch({type:"ADD_ON_SCREEN", word:"DOMINATION"})
		store.dispatch({type:"ADD_ON_SCREEN", word:"ELIMINATION"})
		store.dispatch({type:"ADD_ON_SCREEN", word:"DAM"})
		store.dispatch({type:"ADD_ON_SCREEN", word:"DETROIT"})
		this.unsubscribe = store.subscribe(() => this.forceUpdate());
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
	onUpdate(e) {
		renderContainer(e.target.value);
		socket.emit("receive", {message: e.target.value});
	}
	render() {
		const { store } = this.context;
		const state = store.getState();
		return (
			<div>
				<Header />
				<p>Session: {localStorage.getItem("username")}</p>
				<MainContainer />
				<Login />
				<Footer />
			</div>
			);
	}
};

Container.contextTypes = {
	store: React.PropTypes.object
}
