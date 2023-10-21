// web-server It takes your requests, fetches web pages, and serves them to your web browser, allowing you to see websites and use web applications.

//How are we doing it 

// The http.createServer() method includes request and response parameters 

// the request object can be used to get information aoubt the current HTTP request

// The response object can be use to send a response for a current http request


//if the request form a HTTP server is supposed to display as html, then you should include and http header with correct content type


const http = require('node:http');

//create http server, we have to pass a callby function to createServer
const server = http.createServer((req,res) => { 
    res.end(
        "hello from the other side"
    );
});

//to listen our request to get a response
server.listen(8000, "127.0.0.1", ()=>{
    console.log("listening to port 8000");
});
