import http from 'http'
import fs, { fsync } from 'fs'


const PORT = 3030


const server = http.createServer((req, res) => {


    console.log(req.url);

    //!Server side rendering
    // res.writeHead(200, { 'Content-Type': 'text/html' })
    // res.write(`<h1>URL${req.url}</h1>`)
    // res.end()

    
    // const data = {name:'Leo portillo', age: 36, city: 'Buenos Aires'}
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.end( JSON.stringify(data))
    
    if ( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(htmlFile)
        return
    } 
    
   
    if ( req.url?.endsWith('.js') ) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
    } else if(req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
    }
    
    const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8')
    res.end(responseContent)

})



server.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
    
})