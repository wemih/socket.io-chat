const http = require('http');
const express = require('express');
var session = require('express-session');
const ejs = require('ejs');
const socketio = require('socket.io');
const { joinUser, userLeaveRoom, getRoomUsers } = require ('./user/users.js');
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/chat', (req, res)=>{
    session.nickname = req.body.nickname;
    session.roomname = req.body.roomname;
    res.render('chat');
});

io.on('connection', (socket)=>{
    console.log('Socket connected...')
    socket.on('JoinToRoom', ()=>{
        const user = joinUser(socket.id, session.nickname, session.roomname);
        console.table(user);
        io.emit('updateRoom', session.roomname, getRoomUsers(session.roomname));

        socket.emit('message', 'Welcome to the room')

        socket.broadcast.emit('message', 'User joined to the room!')
    });

    socket.on('disconnect', ()=>{
        const user = userLeaveRoom(socket.id);

        io.emit('updateRoom', user.room, getRoomUsers(user.room));
    })
});

server.listen(port, ()=>{
    console.log(`Server listening on: ${port}...`);
});
