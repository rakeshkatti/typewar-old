import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import SocketIo from 'socket.io';
import session from 'express-session';

const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 8000;
const app = express();
const server = http.Server(app);
const io = SocketIo(server);

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

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
app.use(bodyParser.urlencoded({extended: true}));

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
});

app.post('/login', (req, res) => {
    req.session.regenerate(function (err) {
        req.session.username = req.body.username;
        res.send({username: req.session.username});
    })
});

app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

var rooms = [];

io.on('connection', function (socket) {
    socket.emit('send', {message: 'World'});

    socket.on('startGame', (data) => {
        if (rooms.length > 0) {
            let room = rooms.shift();
            socket.rooms = [];
            socket.emit('receive', {content: {type:"ADD_USER", username: room.userId}});
            socket.join(room.socketId, function(err, result) {
                socket.broadcast.to(socket.rooms[0]).emit('receive', {content: {type:"ADD_USER", username: data.userId}});
                var words = ["DETERMINATION", "DOMINATION", "ILLEGAL", "DAM", "DETROIT"];
                words.map((word) => {
                    var dispatcher = {type: "ADD_ON_SCREEN", word: word};
                    io.sockets.in(socket.rooms[0]).emit('receive', {content: dispatcher});
                });
            });
        } else {
            //Only one guy in the room
            io.sockets.in(socket.rooms[0]).emit('receive', {content: dispatcher});
            socket.emit('receive', {content: {type:"WAITING_FOR_USER"}})
            rooms.push({socketId:socket.rooms[0], userId: data.userId});
        }
    });

    socket.on('dispatch', function (data) {
        socket.broadcast.to(socket.rooms[0]).emit('receive', {content: data});
    });
});
