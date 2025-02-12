var express = require('express'),
    path = require('path'),
    app = express();

var bodyParser = require('body-parser')
var fs = require('fs')

// Express Middleware for serving static files in public
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Splash page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/html/index.html');
});
// Mobile interface
app.get('/mobile', function(req, res){
    res.sendFile(__dirname + '/public/html/mobile.html');
});
// Slideshow
app.get('/powerPoint', function(req, res){
    res.sendFile(__dirname + '/public/html/powerPoint.html');
});
// Slideshow controller
app.get('/controller', function(req, res){
  res.sendFile(__dirname + '/public/html/controller.html');
});

app.post('/', function(request, response) {
  //console.log('POST /')
  console.dir(request.body)
  // let data = request.body;
  // if (typeof request.body.config === 'undefined' && !(typeof request.body.provider === 'undefined')) {
  //   fs.writeFileSync('public/jsons/overlayData.json', JSON.stringify(data));
  // }
  // else if (!(typeof request.body.config === 'undefined')) {
  //   fs.writeFileSync('public/jsons/overlayConfig.json', JSON.stringify(data));
  // }
  //response.writeHead(200, {'Content-Type': 'text/html'})
  //response.end(JSON.stringify(data));
  //response.end('Recieved xoxo')
})

const port = 3000
app.listen(port)
console.log(`Listening at: http://localhost:${port}`)