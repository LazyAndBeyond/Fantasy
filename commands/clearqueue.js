exports.run = (beta, message, args, level) => {
    let queue = beta.getQueue(message.guild.id)
    if (queue.length === 0) return message.channel.send(`No music in queue`)
    for (var i = queue.length - 1; i >= 0; i--) {
      queue.splice(i, 1)
    }
    message.channel.send(`Cleared the queue`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear', 'cq'],
  permLevel: 'User'
}

exports.help = {
  name: 'clearqueue',
  category: 'Music',
  description: 'Clears the queue',
  usage: 'clearqueue'
}