const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Новое соединение установлено');

    // Обработка сообщений от клиента
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log('Получено сообщение:', data);

        // Отправка ответа всем клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ text: data.text, isUser: false }));
            }
        });
    });

    // Обработка закрытия соединения
    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');