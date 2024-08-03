"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const database_1 = __importDefault(require("./database"));
// Crear un servidor WebSocket
const wss = new ws_1.default.Server({ port: 8080 });
wss.on('connection', ws => {
    console.log('Client connected');
    // Función para enviar datos al cliente
    const sendData = async () => {
        try {
            const [rows] = await database_1.default.query('SELECT * FROM sensores');
            ws.send(JSON.stringify(rows));
        }
        catch (err) {
            console.error('Error querying database:', err);
        }
    };
    // Enviar datos periódicamente
    const interval = setInterval(sendData, 5000); // cada 5 segundos
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});
