
exports.run = (beta, message, args, level) => {
  const { version } = require('discord.js')
  const moment = require('moment')
  require('moment-duration-format')
  const duration = moment.duration(beta.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  message.channel.send(`= STATISTICS =
• Full Name      ::   ${beta.user.username}
• CharacterLimit ::   ${2000}
• System Info    ::   ${process.platform}-${process.arch}
• Memory Usage   ::   ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime         ::   ${duration}
• Users          ::   ${beta.users.size.toLocaleString()}
• Servers        ::   ${beta.guilds.size.toLocaleString()}
• Channels       ::   ${beta.channels.size.toLocaleString()}
• Discord.js     ::   v${version}
• Node           ::   ${process.version}`, {code: 'autohotkey'})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'sys',
  category: 'Costum',
  description: 'Gives some useful bot statistics',
  usage: 'sys'
}
