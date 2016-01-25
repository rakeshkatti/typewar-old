import io from "socket.io-client";
import {renderContainer} from "./components/renderContainer";

const socket = io('http://localhost:8000');

socket.on('send', function (data) {
	renderContainer(data.message);
});

// store.dispatch({type: "ADD_ON_SCREEN", word: "DETERMINATION"});
// console.log(store.getState())
