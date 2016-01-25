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

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

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

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send("Server is running successfully : " + req.session.username);
});

app.get('loggedInInfo', (req, res) => {
	if (req.session && req.session.username) {
		res.send({username: req.session.username});
	} else {
		res.status = 404;
		res.send();
	}
})

app.post('/login', (req, res) => {
	req.session.regenerate(function(err) {
		req.session.username = req.body.username;
		res.send({username: req.session.username});
	})
})

app.get('/logout', function(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	});
});

io.on('connection', function (socket) {
  socket.emit('send', { message: 'World' });
  socket.on('receive', function (data) {
    io.sockets.emit('send', { message: data.message });
  });
});
