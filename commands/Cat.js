exports.run = async (beta, message, args, level) => {
  const Discord = require('discord.js')

  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  const snekfetch = require('snekfetch')
  snekfetch.get('http://random.cat/meow')
    .then((res) => {
      const embed = new Discord.RichEmbed()
    .setTitle(`Some Random Cats`)
    .setColor(getRandomHex())
    .setImage(res.body.file)
    .setTimestamp()
    .setFooter('Requested At:', beta.user.displayAvatarURL)
      message.channel.send(embed)
    }
   )
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'cat',
  category: 'Fun',
  description: 'Gives you random cat pics.',
  usage: 'cat'
}
