exports.run = async (client, message, args, level) => {
  await message.reply('**Restarting...**')
  client.commands.forEach(async cmd => {
    await client.unloadCommand(cmd)
  })
  process.exit(1)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'restart',
  category: 'Owner/Admin',
  description: 'restarts the bot.',
  usage: 'restart'
}
