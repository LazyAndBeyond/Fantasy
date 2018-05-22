exports.run = (beta, message, args, level) => {
  function getRandomInt () {
    return Math.floor(Math.random() * 16777215).toString(10)
  }

  const neko = require('neko.js')
  const nekoclient = new neko.Client()

  let user = message.mentions.users.first()
  if (!user) return message.channel.send('O_o you wanna kiss yourself??')
  if (user.id === message.author.id) return message.reply('O_o you still wanna kiss yourself??!!')
  nekoclient.kiss().then((kiss) => message.channel.send(`**${user}** , **${message.author.username}** kissed you! \n`, {
    embed: {
      color: getRandomInt(),
      image: {
        url: kiss.url
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
  name: 'kiss',
  category: 'Fun',
  description: 'kiss a someone',
  usage: 'kiss <mention>'
}
