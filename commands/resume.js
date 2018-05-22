exports.run = async (beta, message, args, level) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === message.guild.id)
    if (voiceConnection === null) return message.reply('**No music being played.**')
    const dispatcher = voiceConnection.player.dispatcher
    if (!dispatcher.paused()) return message.reply('Music is already resumed')
    await dispatcher.resume()
    message.channel.send('Pausing music...')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'pause',
  category: 'Music',
  description: 'Pauses the music',
  usage: 'pause'
}