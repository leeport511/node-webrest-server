import express, { Router } from 'express'
import path from 'path';


interface Options {
    port: number,
    routes: Router,
    publicPath?: string,
}


export class Server {

    private app = express();
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options) {
        const {port, publicPath = 'public', routes} = options
        this.port = port,
        this.publicPath = publicPath,
        this.routes = routes
    }


    async start() {

        //*Middlewares
        this.app.use( express.json() ) //raw //* any request that pass through my server, pass to this middleware and will parse it.
        this.app.use( express.urlencoded({ extended: true })) // x-www-form-urlencoded

        //*Public Folders
        this.app.use( express.static(this.publicPath) )


        //*Routes
        this.app.use( this.routes )



        //*SPA (singlePageApplication)
        this.app.get('*', (req, res ) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
            return
        })

        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            
        })
        
    }

}