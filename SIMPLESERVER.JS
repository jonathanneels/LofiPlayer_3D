var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 9077;//REF: https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
console.log("Server launched => 127.0.0.1:" + port);

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
	  console.log(filename + " 404 not found."); 
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
			  console.log(err); 
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
	  console.log(filename + " 200 ok!")
      response.end();
    });
  });
}).listen(parseInt(port, 10));
