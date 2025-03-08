document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    const socket = new WebSocket('ws://localhost:8080'); 

    function addMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Функция для отображения уведомлений пользователю
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.classList.add(isError ? 'error' : 'info');
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ text: message, isUser: true }));
                addMessage(message, true);
                messageInput.value = '';
            } else {
                showNotification('Ошибка: соединение с сервером не установлено.', true);
            }
        }
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        addMessage(data.text, data.isUser); 
    });

    socket.addEventListener('error', () => {
        showNotification('Ошибка: не удалось подключиться к серверу.', true);
    });

    socket.addEventListener('close', () => {
        showNotification('Соединение с сервером закрыто.', true);
    });
});