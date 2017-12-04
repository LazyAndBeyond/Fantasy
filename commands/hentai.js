exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  const Discord = require('discord.js')
  const randomPuppy = require('random-puppy')
  const realatedSearchs = [
    'Hentai',
    'HQHentai',
    'Hentai boobs',
    'Sexy Hentai'
  ]

  if (message.channel.nsfw) {
    const random = realatedSearchs[Math.round(Math.random() * (realatedSearchs.length - 1))]
    randomPuppy(random)
      .then(url => {
        const embed = new Discord.RichEmbed()
              .setTitle(`${random}`)
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
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'hentai',
  category: 'Fun & NSWF',
  description: 'Hentai pics for lewd people.',
  usage: 'hentai'
}
