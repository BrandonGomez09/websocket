"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.connection = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gomezbga09',
    database: 'multi'
});
