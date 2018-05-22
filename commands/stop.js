exports.run = (beta, message, args, level) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === message.guild.id)
    if (voiceConnection === null) return message.reply('**No music being played.**')
    const dispatcher = voiceConnection.player.dispatcher
    let chan = message.member.voiceChannel
    message.channel.send('Stopping music...')
    dispatcher.end()
    chan.leave()
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['leave'],
  permLevel: 'User'
}

exports.help = {
  name: 'stop',
  category: 'Music',
  description: 'stop the music and leaves the channel',
  usage: 'skip'
}