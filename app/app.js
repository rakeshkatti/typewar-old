import React from "react";
import ReactDOM from "react-dom";
import Test from "./Test";
import io from "socket.io-client";

var socket = io('http://localhost:8000');
socket.on('news', function (data) {
	console.log(data);
	ReactDOM.render(
		<Test name={data.hello}/>,
		document.body
		);
	socket.emit('my other event', { my: 'data' });
});

ReactDOM.render(
	<Test name="World"/>,
	document.body
	);