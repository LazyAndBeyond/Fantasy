exports.run = async (client, message, args, level) => {
  await message.reply('**Shutting down...**')
  client.commands.forEach(async cmd => {
    await client.unloadCommand(cmd)
  })
  process.exit(1)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'shutdown',
  category: 'Owner/Admin',
  description: 'Shuts down the bot.',
  usage: 'shutdown'
}
