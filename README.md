# Restreamer server module for node.js
Restreamer creates stand-alone servers for re-encoding live network audio streams on the fly. 
A single server instance allow any number of audio streams. It may work with video, but I haven't tried thoroughly. 

## Requirements 
- An Unix/Linux box with ffmpeg.

## Installation

	npm install restreamer

(fluent-ffmpeg node module will be installed as dependency)  

## Usage
Start the server with default parameters
	
	var restreamer = require('restreamer');
	// Start server with default port (17856), converting to the Ogg format.
	restreamer.create().listen();

At this point, 

	http://[your-domain]:17856/?url=[your live media URL]
	
will convert whichever input format the input media is, to the free Ogg format. The resulting above URL can be used as a media stream just like that. 

Keep in mind that you're specifying an URL inside an URL (doh!). Encode the media URL to avoid special characters issues.   

## Options
A few options are available. Defaults are: listen to the 17856 port, convert to Ogg, do not allow overriding the output format.

	// Listen on the 5566 port, convert input to the ac3 format
	restreamer.create({port: 5566, format: "ac3").listen();

	// Listen on the 5566 port, allow overriding the output format on the URL
	restreamer.create({port: 5566, override: true}).listen();

	// Specify the port on the listen method.
	restreamer.create().listen(5566);

If you choose to allow overriding the output format, your can specify the desired one in the URL, e.g.:

	http://[your-domain]:17856/?url=[your live media URL]&format=ac3
	
will use AC3 as the output format for the given media stream. If overriding is not allowed, the requested format will be ignored and the default one will be used instead.

## Formats
Input and output formats availability are limited exclusively by your ffmpeg installation. Run ''ffmpeg -formats'' to know which ones are available in your system.   

If you're unsure if a live media stream can be re-encoded, run this in the console:

	ffmpeg -i [your media url] -f ogg ./output.ogg

If the ogg file is playable, everything should work just fine. Otherwise, you can check what's wrong in the ffmpeg output. 

## Questions
Github issues, or dev at sergiokas dot com 
