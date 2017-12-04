exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  if (message.channel.nsfw) {
    const Discord = require('discord.js')
    const snekfetch = require('snekfetch')

    const id = [Math.floor(Math.random() * 10930)]
    const r = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`)
    const preview = r.body[0]['PREVIEW'.toLowerCase()]
    const image = `http://media.oboobs.ru/${preview}`

    const embed = new Discord.RichEmbed()
        .setTitle('BOOBS!!!')
        .setFooter('http://oboobs.ru/')
        .setImage(image)
        .setColor(getRandomHex())
    return message.channel.send({ embed })
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
  name: 'boobs',
  category: 'Fun & NSWF',
  description: 'Boobs pics for lewd people.',
  usage: 'boobs'
}
