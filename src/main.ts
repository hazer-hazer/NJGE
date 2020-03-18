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

const scene = new Block();

const b = new Line(new V2(0, 0), new V2(100, 100));

scene.addChildren(b);

const cvs = new WebCanvas();

const engine = new Engine({
    canvas: cvs,
    rootBlock: scene,
    fps: 1
});

engine.launch();

const server = new Server();

var socket;

const sendImage = canvas => {
    if(!socket){
        return;
    }

    const base64 = canvas.toBuffer('image/jpeg').toString('base64');

    socket.emit('draw', { img: base64 });

    b.move(new V2(100, 100))
}

server.onIo('connection', s => {
    socket = s;
});

engine.onTick(canvas => {
    console.log('Tick')

    sendImage(canvas);
});