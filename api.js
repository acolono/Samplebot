var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
module.exports = {

    init: function (config, playSound) {
        'use strict';
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        var port = process.env.PORT || config.port,
            router = express.Router();

        // Just a test route for checks in the browser (/api).
        router.get('/', function (req, res) {
            console.log(req.path);
            res.json({message: 'hooray! welcome to our api, running!'});
        });

        router.route('/play')
            .post(function (req, res) {
                console.log(req.body);
                res.json({message: 'Sound played!'});
                playSound({
                    type: "message",
                    text: req.body.sound
                });
            });

        // All of our routes will be prefixed with /api
        app.use('/api', router);

        // Start the server.
        app.listen(port);
        console.log('Magic happens on port ' + port);
    }
};