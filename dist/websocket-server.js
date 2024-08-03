"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const PORT_WS = 8080;
const wss = new ws_1.WebSocketServer({ port: PORT_WS });
exports.wss = wss;
console.log(`WebSocket server is running on ws://localhost:${PORT_WS}`);
wss.on('connection', (ws) => {
    console.log('New client connected');
    const intervalId = setInterval(() => {
        const sensorData = {
            temperature: Math.random() * 30,
            humidity: Math.random() * 100,
        };
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(sensorData));
        }
    }, 1000);
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Clear the interval when the client disconnects
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
