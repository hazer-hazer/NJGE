import Canvas from "@utils/Canvas";
import Block from "@blocks/Block";
import { Drawable } from "@blocks/Block2D/Drawable/Drawable";
import Events from "@utils/Events";
import { performance } from "perf_hooks"
import { Scenes, Scene, SceneOptions } from "./Scene";

type EngineOptions = {
    fps: number;
}

class Engine {
    private fps: number;

    private scenes: Scenes;
    private currentScene: Scene;

    private tickEvents: Function[] = [];

    public constructor(opts: EngineOptions) {
        this.fps = opts.fps;

        this.scenes = new Map<string, Scene>();
    }

    // Scenes
    public chooseScene(name: string) : Scene {
        if(!this.scenes.has(name)){
            throw new Error('Scene')
        }
        this.currentScene = this.scenes.get(name);
        return this.currentScene;
    }

    public addScene(opts?: SceneOptions) : Scene {
        let scene = new Scene(opts);
        this.scenes.set(scene.getName(), scene);
        this.chooseScene(scene.getName());
        return scene;
    }

    public getCurrentScene() : Scene {
        return this.currentScene;
    }
    
    // Ticking
    public onTick(ev: Function) : void{
        this.tickEvents.push(ev);
    }

    public triggerTickEvents() : void {
        for(let f of this.tickEvents){
            f.call(this, this.currentScene.getCanvas());
        }
    }

    public tick() : void {
        if(!this.currentScene){
            return;
        }

        this.currentScene.draw();
    }

    public launch() : void {
        setInterval(() => {
            this.tick();
            this.triggerTickEvents();
        }, 1000 / this.fps);
    }
}

export default Engine