const socket = io('http://localhost:3000/');
const messageFrom = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const name = prompt('What is ur name?');
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', userName => {
    appendMessage(`${userName} connected`)
});
socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`)
});

messageFrom.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageContainer.append(messageElement)
}