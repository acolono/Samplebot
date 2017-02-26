# Samplebot
A nodejs audio sampler, provides an api and slackbot integration.

## Installation
- Execute npm install
- Copy config.dist.js to config.js and adjust settings there.
- Copy config-sounds.dist.js to config.js and sound mappings there.
- Start slack with npm start.

### Adding new sounds
- MP3-Files in tracks/smileys are loaded automatically. To create a new file for a smiley, name it like the smiley in slack (e.g. thumbsup.mp3 for :thumbsup:).
- MP3-Files in tracks need to be assigned manually in config-sounds.js.
- When config.player.playRemoteMp3 is enabled you can enter an URL in Slack and the file gets downloaded and played.

### Using the API
- The Samplebot provides a simple API at http://localhost:8081/api
- At the moment it only accepts POST requests to /api/play, with a json body {"sound": "sound_name"}.

Curl Example:

```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "sound": ":tada:"
  }' "http://localhost:8081/api/play"
```

### Slack integration
- To use Samplebot with your Slack, visit your [your Slack's Integrations page](http://my.slack.com/services/new/bot) and add a new bot.
- Set the token in config.slackbot.token in config.js.
- Add the bot to a chatroom and try it out by using :thumbsup:

## Credits
- Oliver Köhler, Author
- Barbara Köhler, Smiley-Sounds
- Thomas Kräftner, Remote MP3 support

The slackbot integration was inspired from https://github.com/kushaltirumala/trump-slackbot