"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Configuración de la conexión a la base de datos
const connection = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    database: 'multi'
});
exports.default = connection;
