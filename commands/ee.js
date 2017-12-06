exports.run = (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  const Discord = require('discord.js')
  const randomPuppy = require('random-puppy')


  if (message.channel.nsfw) {

    randomPuppy('NSFWGIFS')
      .then(url => {
        const embed = new Discord.RichEmbed()
              .setTitle(`NSFW!!!`)
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
  name: 'nsfw',
  category: 'Fun & NSWF',
  description: 'nsfw pics/gifs for lewd people.',
  usage: 'nsfw'
}
