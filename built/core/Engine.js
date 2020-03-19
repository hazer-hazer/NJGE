"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scene_1 = require("./Scene");
class Engine {
    constructor(opts) {
        this.tickEvents = [];
        this.fps = opts.fps;
        this.scenes = new Map();
    }
    // Scenes
    chooseScene(name) {
        if (!this.scenes.has(name)) {
            throw new Error('Scene');
        }
        this.currentScene = this.scenes.get(name);
        return this.currentScene;
    }
    addScene(opts) {
        let scene = new Scene_1.Scene(opts);
        this.scenes.set(scene.getName(), scene);
        this.chooseScene(scene.getName());
        return scene;
    }
    getCurrentScene() {
        return this.currentScene;
    }
    // Ticking
    onTick(ev) {
        this.tickEvents.push(ev);
    }
    triggerTickEvents() {
        for (let f of this.tickEvents) {
            f.call(this, this.currentScene.getCanvas());
        }
    }
    tick() {
        if (!this.currentScene) {
            return;
        }
        this.currentScene.draw();
    }
    launch() {
        setInterval(() => {
            this.tick();
            this.triggerTickEvents();
        }, 1000 / this.fps);
    }
}
exports.default = Engine;
