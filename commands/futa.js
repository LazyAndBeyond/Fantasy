exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  const Discord = require('discord.js')
  const randomPuppy = require('random-puppy')

  if (message.channel.nsfw) {
    randomPuppy('Futanari')
        .then(url => {
          const embed = new Discord.RichEmbed()
                .setTitle(`Lewd Futanaris!!`)
                .setImage(url)
                .setColor(getRandomHex())
          return message.channel.send({ embed })
        })
  } else {
    message.channel.send('Sorry but this is only for nsfw channels.')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Futa', 'Futanari', 'futanari'],
  permLevel: 'User'
}

exports.help = {
  name: 'futa',
  category: 'Fun & NSWF',
  description: 'Futanari pics for lewd people.',
  usage: 'futa'
}