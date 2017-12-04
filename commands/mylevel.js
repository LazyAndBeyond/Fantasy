exports.run = async (beta, message, args, level) => {
  const friendly = beta.config.permLevels.find(l => l.level === level).name
  message.reply(`Your permission level is: ${level} - ${friendly}`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'mylevel',
  category: 'Costum',
  description: 'Gives you your permisson level.',
  usage: 'mylevel'
}
