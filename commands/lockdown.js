exports.run = (beta, message, args, level) => {
  const ms = require('ms')
  const Discord = require('discord.js')
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  const argu = message.content.split(' ').splice(1)
  const time = argu[0]
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds')
  const embed = new Discord.RichEmbed()
.setColor(getRandomHex())
.setTimestamp()
.addField('Action:', 'Lockdown')
.addField('Channel:', message.channel)
.addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
.addField('Time:', `${time}`)

  message.channel.overwritePermissions(message.guild.id, {
    SEND_MESSAGES: false
  })
  message.channel.send(embed)
  setTimeout(function () {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    })
    message.channel.send('Lockdown Lifted')
  }, ms(time))
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
}

exports.help = {
  name: 'lockdown',
  category: 'Moderation',
  description: 'lockdown a channel for everyone',
  usage: 'lockdown <time>'
}
