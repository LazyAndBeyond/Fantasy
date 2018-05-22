exports.run = (beta, message, args, level) => {
    if (!message.guild.voiceConnection) {
      if (!message.member.voiceChannel) return message.channel.send('You need to be in a voice channel')
      var chan = message.member.voiceChannel
      chan.join()
    }
    let suffix = message.content.split(' ').slice(1).join(' ')
    if (!suffix) return message.channel.send('You need to specify a song link or a song name!')

    beta.play1(message, beta.getQueue(message.guild.id), suffix)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'play',
  category: 'Music',
  description: 'Play your favorite music! (Still under TESTS!!)',
  usage: 'play <music name || url>'
}