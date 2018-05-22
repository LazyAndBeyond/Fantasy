exports.run = (beta, message, args, level) => {
  var rb = '```'
  let queue = beta.getQueue(message.guild.id)
  if (queue.length === 0) return message.channel.send(message, 'No music in queue')
  message.channel.send(`${rb}xl\nCurrently playing: ${queue[0].title} | by ${queue[0].requested}${rb}`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['np'],
  permLevel: 'User'
}

exports.help = {
  name: 'nowplaying',
  category: 'Music',
  description: 'Shows the current played song.',
  usage: 'nowplaying'
}