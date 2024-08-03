"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const database_1 = require("../common/database");
class WebSocketServer {
    constructor(port) {
        this.wss = new ws_1.default.Server({ port });
        this.setupConnection();
        console.log(`WebSocket server is running on ws://localhost:${port}`);
    }
    setupConnection() {
        this.wss.on('connection', ws => {
            console.log('New client connected');
            ws.on('message', message => {
                console.log(`Received message => ${message}`);
            });
            ws.on('close', () => {
                console.log('Client has disconnected');
            });
            // Send data periodically (you can change this logic as needed)
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const data = yield this.fetchSensorData();
                ws.send(JSON.stringify(data));
            }), 5000);
        });
    }
    fetchSensorData() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.connection.execute('SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 100');
            return rows;
        });
    }
}
exports.WebSocketServer = WebSocketServer;
