import "module-alias/register"
import Block from '@blocks/Block'
import V2 from "@utils/math/V2"
import Line from "@blocks/Block2D/Drawable/Line"

import Engine from "@core/Engine";
import Server from "@utils/Server";
import { Timer } from "@blocks/Timer/Timer";

const scene = new Block();

const b = new Line({
    name: 'line',
    from: new V2(0, 0),
    to: new V2(100, 100)
});

b.addChild(new Timer({
    name: 'timer',
    interval: 1000 / 60,
    iterations: 100,
    startOnCreate: true
}));

const timer = b.findChild('timer');

timer.on('elapsed', line => {
    line.move(new V2(10, 10));
});

scene.addChild(b);

const engine = new Engine({
    fps: 60
});

engine.addScene({
    rootBlock: scene,
    name: 'main',
    canvasType: 'web',
    canvas: {
        width: 1080,
        height: 720
    }
});

const server = new Server();

var socket;

const sendImage = canvas => {
    if(!socket){
        return;
    }

    const base64 = canvas.toBuffer('image/jpeg').toString('base64');

    socket.emit('draw', { img: base64 });
}

server.onIo('connection', s => {
    socket = s;
});

engine.onTick(canvas => {
    console.log('Tick')

    sendImage(canvas);
});

engine.launch();