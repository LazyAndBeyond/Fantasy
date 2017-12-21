exports.run = async (beta, message, args, level) => {
  if (!args || args.size < 1) return message.reply('You must provide a command to update')

  let response = await beta.unloadCommand(args[0])
  if (response) return message.reply(`Error Unloading: ${response}`)

  response = beta.loadCommand(args[0])
  if (response) return message.reply(`Error Loading: ${response}`)

  message.reply(`Successfully updated **${args[0]}**!`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['up', 'ud'],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'update',
  category: 'Owner/Admin',
  description: 'Reload a command.',
  usage: 'update <command>'
}