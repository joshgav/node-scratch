var http = require("http");
var count = 0;
var port = process.env.PORT || 8080;

function basic_listener(req, res) {
  count++;
  console.log(`request ${count} received`);
  res.writeHead( 200, {"Content-Type": "text/plain"} );
  res.write(`response #${count} received\n`);
  res.end();
}

var http_server = http.createServer(basic_listener);
http_server.listen(port);

console.log(`${__filename}: http server listening on port ${port}`);

