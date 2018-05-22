exports.run = (beta, message, args, level) => {
  const msg = message.content.split(' ').slice(1).join(' ')
  if (!msg) return message.reply('I have nothing to say')
  message.delete()
  message.channel.send(msg)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'say',
  category: 'Costum',
  description: 'Make the bot say something',
  usage: 'say <msg>'
}