var http = require('http');
var url = require('url');
var ffmpeg = require('fluent-ffmpeg');

var defaults = {
	port: 17856,		// Default listening port
	format: 'ogg',	// Resulting format
	override: false	// Allow overriding the format on the URL. 
};

/**
 * Main object, start a restreamer server with the given settings (or defaults if none)
 * - port: port to listen for incoming requests
 * - format: output format to re-encode the input stream.
 * - override: allow overriding the format on the URL.  
 */
var restreamer = function(settings) {
	var self = this;
	settings = settings||{};
	
	// Set defaults
	settings.port = (settings.port||defaults.port);
	settings.format = (settings.format||defaults.format);
	settings.override = (settings.override||defaults.override);
	
	// Request handler, if media is valid the response will never end. 
	var server = http.createServer(function(req, res) {
		// Get media URL from query string
		var u = url.parse(req.url, true);
		var media = u.query['url'];
		var format = u.query['format'];
			format = (settings.override&&format)?format:settings.format;
		// Start converting media.
		if(!media) {
			self.log("No media for " + format + " format");
			res.end();	// Die if no media
		}
		else {
			self.log("Streaming " + media + " to " + format + " format");
			res.writeHeader({'Cache-control': "max-age=0, no-cache"});
			(new ffmpeg(media))
				.toFormat(format)
				.writeToStream(res, function(retcode, error){
					console.log(retcode, error);
					self.log("Finished " + format + " encoding for " + media);
				});
		}
	});

	// Public listen function. At this point, the listening port can be overriden. 
	self.listen = function(port) {
		server.listen(port||settings.port);
	};	
	
	self.log = function(msg) {
		console.log(msg);
	};
};
 
restreamer.create = function(settings) {
	return new restreamer(settings);
};

// Export just the server function. 
module.exports = restreamer;