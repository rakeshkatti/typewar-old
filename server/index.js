import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIo from 'socket.io';
import { createStore } from 'redux';
import reducer from "../reducers/index";
import session from 'express-session';

const hostname = process.env.HOSTNAME || "localhost";
const port     = process.env.PORT || 8000;

const app      = express();
const server   = http.Server(app);
const io       = SocketIo(server);
const store = createStore(reducer);

server.listen(port, () => {
	console.info("==> ✅  Server is listening");
	console.info("==> 🌎  Go to http://%s:%s", hostname, port);
});

// console.log(Math.random().toString(36).slice(2))

app.use(session({
	secret: 'typingsometypos',
	resave: false,
	saveUninitialized: true
  }));

app.get('/', (req, res) => {
	res.send("Server is running successfully : " + req.session.username);
});

app.get('/login', (req, res) => {
	req.session.regenerate(function(err) {
		req.session.username = Math.random().toString(36).slice(2)
		res.redirect('/');  
	})
})

app.get('/logout', function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
	req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
		res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});  

io.on('connection', function (socket) {
	// setInterval(() => {
 //          store.dispatch({ type: 'ADD_ON_SCREEN', word: "DETERMINATION" });
 //          socket.emit('store', {state: store.getState()})
 //          // console.log(store.getState());
 //      }, 3000);
  socket.emit('send', { message: 'World' });
  socket.on('receive', function (data) {
    io.sockets.emit('send', { message: data.message });
  });
});