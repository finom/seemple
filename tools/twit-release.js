const Twit = require('twit');
const { version } = require('../package');

const { env } = process;

const twit = new Twit({
    consumer_key: env.TWITTER_CONSUMER_KEY,
    consumer_secret: env.TWITTER_CONSUMER_SECRET,
    access_token: env.TWITTER_ACCESS_TOKEN,
    access_token_secret: env.TWITTER_ACCESS_TOKEN_SECRET
});

twit.post('statuses/update', {
    status: `🚀 Hello humans! Matreshka.js v${version} is released 🎉🎉🎉`
        + ` https://github.com/matreshkajs/matreshka/releases/tag/v${version}`
}, (err) => {
    if (err) {
        console.log(`Something gone wrong with Twitter bot: ${err}`); // eslint-disable-line no-console
    }
});
