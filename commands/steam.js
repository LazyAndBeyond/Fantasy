exports.run = async (beta, message, args, level) => {
  try {
  const Discord = require('discord.js')
  const snekfetch = require('snekfetch')
  const query  = message.content.split(/\s+/g).slice(1).join(' ')
  const { body } = await snekfetch
        .get('https://store.steampowered.com/api/storesearch')
        .query({
          cc: 'us',
          l: 'en',
          term: query
        })
  if (!body.total) return message.channel.send(`No results found for **${query}**!`)

  const current = body.items[0].price ? body.items[0].price.final / 100 : 0.00
  const original = body.items[0].price ? body.items[0].price.initial / 100 : 0.00
  const price = current === original ? `$${current}` : `~~$${original}~~ $${current}`

  const embed = new Discord.RichEmbed()
        .setColor(beta.getRandomHex())
        .setAuthor(body.items[0].name, 'https://i.imgur.com/vL8b4D5.png')
        .setURL(`http://store.steampowered.com/app/${body.items[0].id}`)
        .setImage(body.items[0].tiny_image)
        .setDescription(`• **Price:** ${price} **score:** ${body.items[0].metascore || '`N/A`'}`)
  return message.channel.send({ embed })
  } catch(err) {
    message.reply('and error accured while tryng to seach the game')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'steam',
  category: 'Costum',
  description: 'search for your favoret steam games here (OUT DATTED!)',
  usage: 'steam <game name>'
}
