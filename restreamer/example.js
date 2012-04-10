var restreamer = require("./lib/restreamer");

var s = restreamer.create({port: 5566, override: true}).listen();
