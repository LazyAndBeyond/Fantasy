exports.run = (beta, message, args, level) => {
  if (!args[0]) {
    const settings = message.guild ? beta.settings.get(message.guild.id) : beta.config.defaultSettings

    const myCommands = message.guild ? beta.commands.filter(cmd => beta.levelCache[cmd.conf.permLevel] <= level) : beta.commands.filter(cmd => beta.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true)

    const commandNames = myCommands.keyArray()
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)

    let currentCategory = ''
    let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
    sorted.forEach(c => {
      const cat = c.help.category.toProperCase()
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`
        currentCategory = cat
      }
      output += `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`
    })
    message.channel.send(output, {code: 'asciidoc', split: { char: '\u200b' }})
  } else {
    let command = args[0]
    if (beta.commands.has(command)) {
      command = beta.commands.get(command)
      if (level < beta.levelCache[command.conf.permLevel]) return
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(', ')}\n= ${command.help.name} =`, {code: 'asciidoc'})
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  category: 'Support',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
}
