let socket = io();
let roomname = document.querySelector('#roomname');
let userslist = document.querySelector('#userslist');

socket.emit('JoinToRoom');

socket.emit('updateRoom', (room)=> {
    outputRoomname(room);
    outputUserList(users);
})

socket.on('message', (msg)=>{
    console.log(msg);
})

function outputRoomname(room){
    roomname.innerHTML = room;
}

function outputUserList(users){
    userslist.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = user.name;
        userslist.appendChild(li);
    });
}