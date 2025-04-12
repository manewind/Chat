document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const clearChatButton = document.getElementById('clear-chat-button');
    const nameInput = document.getElementById('name-input');
    const setNameButton = document.getElementById('set-name-button');
    const editNameButton = document.getElementById('edit-name-button');
    const changeBackgroundButton = document.getElementById('change-background-button');

    let userName = localStorage.getItem('userName') || '';
    let currentBackgroundIndex = parseInt(localStorage.getItem('backgroundIndex')) || 0;

    const backgrounds = [
        'linear-gradient(135deg, #6a11cb, #2575fc)',
        'linear-gradient(135deg, #ff7e5f, #feb47b)',
        'linear-gradient(135deg, #4e54c8, #8f94fb)',
        'linear-gradient(135deg, #ff9a9e, #fad0c4)',
        '#f0f0f0'
    ];

    function applyBackground() {
        document.body.style.background = backgrounds[currentBackgroundIndex];
    }

    function toggleNameSection() {
        if (userName) {
            setNameButton.style.display = 'none';
            editNameButton.style.display = 'inline-block';
            messageInput.disabled = false;
            sendButton.disabled = false;
        } else {
            setNameButton.style.display = 'inline-block';
            editNameButton.style.display = 'none';
            messageInput.disabled = true;
            sendButton.disabled = true;
        }
    }

    function addMessage(message, isUser, senderName) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');

        const nameElement = document.createElement('span');
        nameElement.classList.add('sender-name');
        nameElement.classList.add(isUser ? 'user' : 'bot');
        nameElement.textContent = senderName ? `${senderName}: ` : '';
        messageElement.appendChild(nameElement);

        const textElement = document.createTextNode(message);
        messageElement.appendChild(textElement);

        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function handleSetName() {
        const name = nameInput.value.trim();
        if (!name) {
            alert('Имя не может быть пустым!');
            return;
        }
        userName = name;
        localStorage.setItem('userName', userName);
        toggleNameSection();
        nameInput.value = '';
    }

    function getBotResponse(userMessage) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const botMessage = `Бот отвечает: "${userMessage}"`;
                resolve(botMessage);
            }, 1000);
        });
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (!message || !userName) return;

        addMessage(message, true, userName);
        messageInput.value = '';

        const botMessage = await getBotResponse(message);
        addMessage(botMessage, false, 'Бот');
    });

    setNameButton.addEventListener('click', handleSetName);

    editNameButton.addEventListener('click', () => {
        localStorage.removeItem('userName');
        userName = '';
        toggleNameSection();
    });

    clearChatButton.addEventListener('click', () => {
        chatWindow.innerHTML = '';
    });

    changeBackgroundButton.addEventListener('click', () => {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
        localStorage.setItem('backgroundIndex', currentBackgroundIndex);
        applyBackground();
    });

    toggleNameSection();
    applyBackground();
});
