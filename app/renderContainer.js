import React from "react";
import Container from "./container";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import reducer from "../reducers/index";
import { createStore } from 'redux';

const store = createStore(reducer);

const renderContainer = (name) => {
	ReactDOM.render(
		<Provider store={store}>
			<Container name={name}/>
		</Provider>,
	document.getElementById('container')
	);
}

export {renderContainer};