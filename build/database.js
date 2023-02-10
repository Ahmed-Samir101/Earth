"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_HOST, DATABASE, DATABASE_TEST, DB_USER, TEST_USER, DB_PASSWORD, ENV } = process.env;
let client;
const env = ENV?.trim();
client = new pg_1.Pool({
    host: DB_HOST,
    database: DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});
if (env === "test") {
    client = new pg_1.Pool({
        host: DB_HOST,
        database: DATABASE_TEST,
        user: TEST_USER,
        password: DB_PASSWORD
    });
}
exports.default = client;
