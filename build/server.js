"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movie_handler_1 = __importDefault(require("./handlers/movie.handler"));
const app = (0, express_1.default)();
const port = 5050;
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>");
});
app.listen(port, () => {
    console.log('Listening on port: ' + port);
});
(0, movie_handler_1.default)(app);
