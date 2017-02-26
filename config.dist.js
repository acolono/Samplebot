var config = {
    slackbot: {
        enabled: true,
        token: 'YOUR-TOKEN',
        name: 'Samplebot'
    },
    api: {
        // Enable / disable REST API
        enabled: true,
        port: 8081
    },
    player: {
        // The mp3 player is normally autodetected by the play-sound package.
        // If you experience long loading times (e.g. on old rapsberry pi's)
        // we recommend using the mpg123 player.
        //player: 'mpg123',

        // If enabled the player downloads mp3 files from urls found in
        // data.text and plays them.
        playRemoteMp3: true
    }
};

module.exports = config;