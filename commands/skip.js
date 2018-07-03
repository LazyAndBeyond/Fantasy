exports.run = (beta, message, args, level) => {
    let suffix = message.content.split(' ').slice(1).join(' ')
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === message.guild.id)
    if (voiceConnection === null) return message.reply('**No music being played.**')

    const queue = beta.getQueue(message.guild.id)

    let toSkip = 1
    if (!isNaN(suffix) && parseInt(suffix) > 0) {
      toSkip = parseInt(suffix)
    }
    toSkip = Math.min(toSkip, queue.length)

    queue.splice(0, toSkip - 1)

    const dispatcher = voiceConnection.player.dispatcher
    if (voiceConnection.paused) dispatcher.resume()
    dispatcher.end()
    message.channel.send('Skipping song...')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'skip',
  category: 'Music',
  description: 'Skip the music',
  usage: 'skip'
}