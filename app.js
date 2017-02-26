'use strict';

var config = require('./config');
var sounds = require('./config-sounds');
var player = require('play-sound')(config.player);
var playRemoteMp3 = require('./play-remote-mp3');
var glob = require("glob");
var path = require('path');

var sounds = {};

if (config.slackbot.enabled) {
    var SlackBot = require('slackbots');
}

// Add all mp3 files from tracks/smileys to smileys array.
glob("./tracks/smileys/*.mp3", function (er, files) {
    if (er) {
        console.log(er);
    }
    files.forEach(function (file) {
        var key = ':' + path.basename(file, '.mp3') + ':';
        sounds[key] = file;
    });
});

var maybePlay = function (data, keyword, path) {
    if (data && data.text && data.text.toLowerCase().indexOf(keyword) >= 0) {
        player.play(path);
        console.log('Played ' + keyword + '.');
        return true;
    }
    return false;
};

var playSound = function (data) {
    if (data.type === 'message' && data.text) {

        // Play sounds for smileys.
        var regex = new RegExp(Object.keys(sounds).join('|'), 'g'),
            key = data.text.match(regex);
        if (key) {
            key.forEach(function (file_key) {
                console.log('Playing ' + file_key + '  (' + sounds[file_key] + ').');
                player.play(sounds[file_key]);
            });
        }
        if (config.player.playRemoteMp3) {
            playRemoteMp3(data.text);
        }
    }
};

if (config.slackbot.enabled) {
    // Create a bot.
    var bot = new SlackBot(config.slackbot);
    bot.on('message', function (data) {
        playSound(data);
    });
}

if (config.api.enabled) {
    var api = require('./api');
    api.init(config.api, playSound);
}
