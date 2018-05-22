module.exports = (beta, message) => {
  const settings = message.guild
      ? beta.settings.get(message.guild.id)
      : beta.config.defaultSettings
  if (message.author.bot) return
  
  message.settings = settings
  
    const swearWords = ['fuck', 'shit', 'Shit ', 'SHIT', 'FUCK', 'dick', 'pussy', 'PUSSY', 'Pussy', 'fuck off', 'fuck you', 'fucking', 'cunt', 'faggot', 'ass', 'asshole', 'nigga', 'NIGGA', 'Nigga', 'cock', 'Cock', 'COCK']
    
  if (swearWords.some(word => message.content.includes(word))) {
  if (settings.swearDitector === 'true') {
    message.reply('Oh no you said a bad word!!!')
    message.delete()
  }
  }
  const afk = require('../data/afk.json')
  afk.map(user => {
    if (message.isMemberMentioned(beta.users.get(user))) {
       message.reply('The user is currenly AFK, he\'ll be back soon.')
    }
  })

  const sbl = require('../data/blservers.json')
  const ubl = require('../data/blusers.json')
    if (sbl.indexOf(message.guild.id) !== -1 && message.content.startsWith(settings.prefix)) {
      return
    }
    if (ubl.indexOf(message.author.id) !== -1 && message.content.startsWith(settings.prefix)) {
      return
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
    Your permission level is **${level}** (**${beta.config.permLevels.find(l => l.level === level).name}**)
    This command requires level **${beta.levelCache[cmd.conf.permLevel]}** (**${cmd.conf.permLevel}**)`)
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