exports.run = (beta, message, args, level) => {
      let suffix = message.content.split(' ').slice(1).join(' ')
      if (!suffix) return message.reply('You need to set a volume')
      beta.volume(message, suffix) 
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sv', 'volume', 'setvolume'],
  permLevel: 'User'
}

exports.help = {
  name: 'setVolume',
  category: 'Music',
  description: 'Change the current music volume',
  usage: 'setVolume <0 - 200>'
}