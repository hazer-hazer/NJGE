import "module-alias/register"
import Block2D from '@blocks/Block2D/Block2D';
import Block from '@blocks/Block'
import V2 from "@utils/math/V2"
import Line from "@blocks/Block2D/Drawable/Line"
import { Drawable } from "@blocks/Block2D/Drawable/Drawable";
import { WebCanvas } from "@utils/WebCanvas";

import * as fs from "fs"
import Engine from "@core/Engine";
import Server from "@utils/Server";
import { Timer } from "@blocks/Timer/Timer";

const scene = new Block();

const b = new Line(new V2(0, 0), new V2(100, 100));

b.addChild(new Timer({
    name: 'timer',
    interval: 50,
    iterations: 100,
    startOnCreate: true
}));

const timer = b.findChildren('timer');

timer.on('elapsed', line => {
    (line as Block2D).move(new V2(10, 10));
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