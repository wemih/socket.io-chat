const users = [];

function joinUser(id, name, room){
    const user = {id, name, room}
    users.push(user);

    return users;
    
}

function getRoomUsers(room){
    return users.filter( user => user.room === room)
}

function userLeaveRoom(id){
    const index = users.findIndex(user => user.id === id);
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
    
}
module.exports = {
    joinUser,
    getRoomUsers,
    userLeaveRoom
}