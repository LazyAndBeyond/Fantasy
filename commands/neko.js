exports.run = (beta, message, args, level) => {
  function getRandomInt () {
    return Math.floor(Math.random() * 16777215).toString(10)
  }

  const neko = require('neko.js')
  const nekoclient = new neko.Client()

  nekoclient.neko().then((neko) => message.channel.send({
    embed: {
      color: getRandomInt(),
      image: {
        url: neko.neko
      }
    }

  }).catch(e => console.warn('wew tf happened here ' + e)))
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'neko',
  category: 'Fun',
  description: 'random neko pic.',
  usage: 'neko'
}
