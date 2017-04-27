var winston = require('winston');
// const appInsights = require('applicationinsights');

var url = require('url');
var http = require('http');
var count = 0;
var port = process.env.PORT || 8080;

function basic_listener(req, res) {
  count++;
  console.log(`console: request ${count} received`);
  winston.info(`winston: request ${count} received`);
  // appInsights.getClient().trackTrace('basic_listener received request', 2, req);
  res.writeHead( 200, {"Content-Type": "text/plain"} );
  res.write(`http: response #${count} received\n`);
  res.end();
  if (url.parse(req.url).path.startsWith('/stop')) {
    console.log(`Request to: ${req.url}`);
    stop();
  }
}

function stop() {
  console.log('Gracefully stopping process.');
  process.exit(0);
}

var http_server = http.createServer(basic_listener);
http_server.on('connection', (socket) => {
  socket.setTimeout(0); // no keep-alive
});
http_server.listen(port);

console.log(`console: http server listening on port ${port}`);
winston.info(`winston: http server listening on port ${port}`);

