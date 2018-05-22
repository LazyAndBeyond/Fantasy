exports.run = (beta, message, args, level) => {
  try {
    let code = message.content.split(' ').splice(1).join(' ')
    let result = eval(code)
    message.channel.send('```diff\n+ ' + result + '```')
  } catch (err) {
    message.channel.send('```diff\n- ' + err + '```')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['code', 'executes'],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'eval',
  category: 'Owner/Admin',
  description: 'Evaluates JavaScript code and executes it.',
  usage: 'eval <code>'
}
