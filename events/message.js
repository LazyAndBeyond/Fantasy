module.exports = (beta, message) => {
  const settings = message.guild
      ? beta.settings.get(message.guild.id)
      : beta.config.defaultSettings

  message.settings = settings
  
      if (settings.swearDitector !== 'true') return

  const swearWords = ['fuck', 'shit', 'Shit ', 'SHIT', 'FUCK', 'dick', 'pussy', 'fuck off', 'fuck you', 'fucking', 'cunt', 'faggot', 'ass', 'asshole']
  if (swearWords.some(word => message.content.includes(word))) {
    message.reply('Oh no you said a bad word!!!')
    message.delete()
  }

  if (message.content.indexOf(settings.prefix) !== 0) return
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const level = beta.permlevel(message)
  const cmd = beta.commands.get(command) || beta.commands.get(beta.aliases.get(command))
  if (!cmd) return
  if (cmd && !message.guild && cmd.conf.guildOnly) { return message.channel.send('This command is unavailable via private message. Please run this command in a guild.') }

  if (level < beta.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === 'true') {
      return message.channel.send(`You do not have permission to use this command.
    Your permission level is ${level} (${beta.config.permLevels.find(l => l.level === level).name})
    This command requires level ${beta.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
    } else {
      return
    }
  }
  message.author.permLevel = level

  message.flags = []
  while (args[0] && args[0][0] === '$$') {
    message.flags.push(args.shift().slice(1))
  }
  cmd.run(beta, message, args, level)
}