var restreamer = require("./lib/restreamer");
var port = process.env.PORT || 5566;
console.log('Listening on port ' + port);
var s = restreamer.create({port: port, override: true}).listen();
