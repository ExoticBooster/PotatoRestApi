//http importen mit js syntax
const http = require('http');
const app = require('./app');
// hardcoded oder aus dem Enviroment genommen - hier 
const port = process.env.port || 3000;

//server erstellen
const server = http.createServer(app);

server.listen(port);