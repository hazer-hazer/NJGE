"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const Block_1 = require("@blocks/Block");
const V2_1 = require("@utils/math/V2");
const Line_1 = require("@blocks/Block2D/Drawable/Line");
const WebCanvas_1 = require("@utils/WebCanvas");
const Engine_1 = require("@core/Engine");
const Server_1 = require("@utils/Server");
const scene = new Block_1.default();
const b = new Line_1.default(new V2_1.default(0, 0), new V2_1.default(100, 100));
scene.addChildren(b);
const cvs = new WebCanvas_1.WebCanvas();
const engine = new Engine_1.default({
    canvas: cvs,
    rootBlock: scene,
    fps: 1
});
engine.launch();
const server = new Server_1.default();
var socket;
const sendImage = canvas => {
    if (!socket) {
        return;
    }
    const base64 = canvas.toBuffer('image/jpeg').toString('base64');
    socket.emit('draw', { img: base64 });
    b.move(new V2_1.default(100, 100));
};
server.onIo('connection', s => {
    socket = s;
});
engine.onTick(canvas => {
    console.log('Tick');
    sendImage(canvas);
});
