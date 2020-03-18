const http = require('http');
const io = require('socket.io')
const app = require('express')()

class Server {
    private server
    private io

    public constructor(){
        this.server = http.createServer(app);
        this.io = io.listen(this.server);

        this.server.listen(8080, 'localhost', () => {
            console.log(console.log('Socket server listen on port 8080'))
        });
    }
    
    public onIo(name: string, func: Function) : void {
        this.io.sockets.on(name, func);
    }
}

export default Server