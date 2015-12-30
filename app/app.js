import io from "socket.io-client";
import {renderContainer} from "./renderContainer";
import reducer from "./reducers/index";
import { createStore } from 'redux'

var socket = io('http://localhost:8000');

let store = createStore(reducer)

console.log(store.getState())

socket.on('send', function (data) {
	renderContainer(data.message);
});