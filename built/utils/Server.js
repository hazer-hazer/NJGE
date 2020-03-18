"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const io = require('socket.io');
const app = require('express')();
class Server {
    constructor() {
        this.server = http.createServer(app);
        this.io = io.listen(this.server);
        this.server.listen(8080, 'localhost', () => {
            console.log(console.log('Socket server listen on port 8080'));
        });
    }
    onIo(name, func) {
        this.io.sockets.on(name, func);
    }
}
exports.default = Server;
