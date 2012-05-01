var restreamer = require("./lib/restreamer");

var s = restreamer.create({port: process.env.PORT || 5566, override: true}).listen();
