exports.run = (beta, message, args, level) => {
  function getRandomInt () {
    return Math.floor(Math.random() * 16777215).toString(10)
  }

  const neko = require('neko.js')
  const nekoclient = new neko.Client()

  if (message.channel.nsfw) {
    nekoclient.lizard().then((lizard) => message.channel.send({
      embed: {
          color: getRandomInt(),
          image: {
              url: lizard.url
            }
        }

    }).catch(e => console.warn('wew tf happened here ' + e)))
  } else {
    message.channel.send('this command only work on nsfw channels')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'lizard',
  category: 'Fun',
  description: 'random lizards pic.',
  usage: 'lizard'
}
