/**
 * 
 *  title: 
 *  description
 *  author:
 *  date:
 *  
 */

// dependencies
const { type } = require('os');
const path = require('path');
const { StringDecoder } = require('string_decoder');
const url = require('url'); 
const notFoundHandeler = require('../handelers/routeHandeler/notFoundHandeler');
const route = require('../route');
const { converter, stringifyJson, parseJson } = require('./utilites');


// utilities variable
const decoder = new StringDecoder('utf-8');


const handleReqRes = (req, res) => {

     const method = req.method.toLowerCase();
     const headers = req.headers; 
     const parsedUrl = url.parse(req.url, true) 
     const queryObj = parsedUrl.query;
     const requestPath = parsedUrl.pathname;
     const trimmedPath = requestPath.replace(/^\/+|\/+$/g, '')
     
     const reqObj = {
            method,
            headers,
            parsedUrl,
            queryObj,
            requestPath,
            trimmedPath
     }

     let realData = '';
     
     const chosenHandeler = route[trimmedPath] ? route[trimmedPath] : notFoundHandeler;



     req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
     });

     req.on('end',()=>{
        realData += decoder.end();  

        reqObj.body = parseJson(realData);  

        chosenHandeler(reqObj, (statusCode, payload)=>{
            statusCode = typeof statusCode === 'number'?statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
            res.writeHead(statusCode,{'Content-Type':'application/json'});
            res.end(stringifyJson(payload))
        })
     })

    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify({name: 'md sohidul islam', email: 'mddsohidulislam@gmail.com'}))

    // chosenHandeler(reqObj, (statusCode, payload)=>{
    //     res.writeHead(statusCode,{'Content-Type':'application/json'});
    //     res.end(stringifyJson(payload))
    // })



}


module.exports = handleReqRes;