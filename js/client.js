const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, postion)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(postion);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})
var password = "tanuja1502";
var input = prompt('Enter your Room password');
if(input != password)
    input = prompt('Incorrect password! Please enter correct password');

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);
append("You joined the chat", 'center')

socket.on('user-joined', name =>{
//console.log(data);
append(`${name} joined the chat`, 'center')
});

socket.on('receive', data =>{
    //console.log(data);
    append(`${data.name}: ${data.message}`, 'left')
});

socket.on('left', name =>{
    //console.log(data);
    append(`${name} left the chat`, 'center')
});
    