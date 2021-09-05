/**
 * title: 
 * description:
 * author:
 * date:
 */

// dependencies
const http = require('http');
const handleReqRes = require('./helpers/handleReqRes');
require('dotenv').config();
// app object module-scaffolding

const app = {}; 

// utilities variable

app.config={
    port: 30008
}

app.createServer = () => {
    http.createServer(app.handleReqRes)     //calling handle req res function
    .listen(app.config.port,()=>{           // crete server and listenig the port
        console.log(`Server is running on port http://localhost:30008`);
    })
}
 
app.handleReqRes =  handleReqRes

app.createServer()


const result = (...arg) => {
     let sum = 0;

     arg.map(num => {
         sum += Number(num);
     })

     console.log(sum);
}

result('11','22','33','44')