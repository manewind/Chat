document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');

    let messages = [];

    function addMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendMessageToServer(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                messages.push({ text: message, isUser: true });
                resolve();
            }, 500);
        });
    }



    function getBotResponse(userMessage) {
        const botResponses = [
            "Привет! Как дела?",
            "Интересно. Расскажи подробнее.",
            "Понял. Что еще?",
            "Здорово! Продолжай.",
            "Спасибо за информацию!",
        ];
        return botResponses[Math.floor(Math.random() * botResponses.length)];
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            await sendMessageToServer(message);

            setTimeout(() => {
                const botMessage = getBotResponse(message);
                addMessage(botMessage, false);
                messages.push({ text: botMessage, isUser: false });
            }, 1000);

            messageInput.value = '';
        }
    });

    setInterval(async () => {
        const messages = await fetchMessagesFromServer();
        chatWindow.innerHTML = '';
        messages.forEach(msg => {
            addMessage(msg.text, msg.isUser);
        });
    }, 2000);
});