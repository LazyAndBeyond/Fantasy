exports.run = (beta, message, args, level) => {
  function getRandomHex () {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

  const Discord = require('discord.js')
  const booru = require('booru')
  if (message.channel.nsfw) {
    if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('Sorry but those stuff are not allowed iven NSFW channels....')

    var search = message.content.split(/\s+/g).slice(1).join(' ')
    booru.search('r34', [search], { limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
              for (let image of images) {
                const embed = new Discord.RichEmbed()
                        .setAuthor(`Rule34 ${search}`)
                        .setDescription(`[Image URL](${image.common.file_url})`)
                        .setImage(image.common.file_url)
                        .setColor(getRandomHex())
                return message.channel.send({ embed })
              }
            }).catch(err => {
              if (err.name === 'booruError') {
                return message.channel.send(`No results found for **${search}**!`)
              } else {
                console.log(err)
                return message.channel.send(`No results found for **${search}**!`)
              }
            })
  } else {
    message.channel.send('Sorry this can work only in NSFW channels...')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['r34'],
  permLevel: 'User'
}

exports.help = {
  name: 'rule34',
  category: 'Fun & NSWF',
  description: 'Search for nsfw pics in rule34.',
  usage: 'rule34 <query> '
}