import React from "react";
import Container from "./container";
import ReactDOM from "react-dom";

const renderContainer = (name) => {
	ReactDOM.render(
	<Container name={name}/>,
	document.getElementById('container')
	);
}

export {renderContainer};