const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Новое соединение установлено');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log('Получено сообщение:', data);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ text: data.text, isUser: false }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');