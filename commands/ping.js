exports.run = async (beta, message, args, level) => {
  const msg = await message.channel.send('Ping?')
  msg.edit(`Pong! Latency is **${msg.createdTimestamp - message.createdTimestamp}ms**. API Latency is **${Math.round(beta.ping)}ms**`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'ping',
  category: 'Costum',
  description: 'You see... its like ping.... and the bot says PONG!!',
  usage: 'ping'
}
