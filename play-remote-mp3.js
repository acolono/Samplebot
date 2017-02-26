'use strict';

var https = require('https');
var readChunk = require('read-chunk');
var urlRegex = require('url-regex');
var fileType = require('file-type');
var fs = require('fs');
var player = require('play-sound')({});

var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
            var buffer = readChunk.sync(dest, 0, 4100),
                mime = fileType(buffer).mime;
            if (mime === "audio/mpeg") {
                console.log("Play '" + url + "'");
                player.play(dest);
            } else {
                fs.unlink(dest);
            }
        });
    }).on('error', function (err) {
        // Handle errors
        // Delete the file async. (But we don't check the result)
        fs.unlink(dest);
        if (cb) {
            cb(err.message);
        }
    });
};

var findmp3 = function (message) {
    if (!message) {
        return;
    }
    var urls = message.match(urlRegex()),
        url = false;

    if (message.match('shut up')) {
        player.stop();
    }

    if (urls && urls.length > 0 && urls[0].substr(-5) === ".mp3>") {
        url = urls[0].substring(0, urls[0].length - 1);
        console.log("Attempt play '" + url + "'");
        download(url, "tmp/download.mp3");
        return true;
    }

    return false;
};

module.exports = findmp3;
