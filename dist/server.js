"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mysql_1 = __importDefault(require("mysql"));
// Configurar la base de datos MySQL
const db = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gomezbga09',
    database: 'sensores'
});
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL correctamente');
});
// Configurar el servidor Express
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
// Ruta para verificar que el servidor HTTP funciona
app.get('/', (req, res) => {
    res.send('Servidor HTTP y WebSocket están corriendo');
});
// Conexión de WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    // Emitir los datos guardados en la base de datos cuando un cliente se conecta
    db.query('SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 10', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return;
        }
        socket.emit('message', JSON.stringify(results));
    });
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
// Función para consultar la base de datos y emitir datos a través de WebSocket
const emitSensorData = () => {
    db.query('SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return;
        }
        if (results.length > 0) {
            io.emit('message', JSON.stringify(results[0]));
        }
    });
};
// Consultar la base de datos cada 5 segundos y emitir los datos a través de WebSocket
setInterval(emitSensorData, 5000);
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Servidor HTTP y WebSocket corriendo en el puerto ${PORT}`);
});
