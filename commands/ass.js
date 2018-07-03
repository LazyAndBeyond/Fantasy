exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  if (message.channel.nsfw) {
    const Discord = require('discord.js')
    const snekfetch = require('snekfetch')

    const id = [Math.floor(Math.random() * 5000)]
    const r = await snekfetch.get(`http://api.obutts.ru/butts_preview/${id}`)
    console.log(r.body)
    const preview = r.body[0]['PREVIEW'.toLowerCase()]
    const image = `http://media.obutts.ru/${preview}`
    const embed = new Discord.RichEmbed()
        .setTitle('ASS!!!')
        .setFooter('http://obutts.ru/')
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
  name: 'ass',
  category: 'Fun & NSWF',
  description: 'ass pics for lewd people.',
  usage: 'ass'
}
