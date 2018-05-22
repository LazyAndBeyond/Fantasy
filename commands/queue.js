exports.run = (beta, message, args, level) => {
  var rb = '```'
    let queue = beta.getQueue(message.guild.id)
    if (queue.length === 0) return message.channel.send('No music in queue')
    let text = ''
    for (let i = 0; i < queue.length; i++) {
      text += `${(i + 1)}. ${queue[i].title} | requested by ${queue[i].requested}\n`
    }
    message.channel.send(`${rb}xl\n${text}${rb}`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'queue',
  category: 'Music',
  description: 'Gives you the music queue',
  usage: 'queue'
}