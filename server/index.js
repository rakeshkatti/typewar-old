import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIo from 'socket.io';

const hostname = process.env.HOSTNAME || "localhost";
const port     = process.env.PORT || 8000;

const app      = express();
const server   = http.Server(app);
const io       = SocketIo(server);

server.listen(port, () => {
	console.info("==> ✅  Server is listening");
	console.info("==> 🌎  Go to http://%s:%s", hostname, port);
});

app.get('/', (req, res) => {
	res.send("Server is running successfully");
});

io.on('connection', function (socket) {
  socket.emit('send', { message: 'World' });
  socket.on('receive', function (data) {
    io.sockets.emit('send', { message: data.message });
  });
});