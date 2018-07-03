exports.run = (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  const Discord = require('discord.js')
  const answer = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes, definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Yes',
    'Signs point to yes',
    'The reply is hazy, try again',
    'Ask again later',
    "I'd better not tell you now",
    'I cannot predict now',
    'Concentrate and ask again',
    "Don't count on it",
    'My sources say no',
    "The outlook isn't so good",
    'Very doubtful',
    'B-Baka! No!',
    'Yes daddy...',
    'Is that iven a question?!',
    'Try to ask someone else... IM BUSY!!',
    'Dont ask me ask you mom!!',
    'NOPE!!!',
    'YEA!!!',
    'No comment...',
    'Try agin...'
  ]
  let question = message.content.split(/\s+/g).slice(1).join(' ')

  if (!question) {
    return message.channel.send('You must provide a question!')
  }

  const embed = new Discord.RichEmbed()
              .setAuthor(question, 'https://a.safe.moe/aKDHV.png')
              .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
              .setColor(getRandomHex())
  return message.channel.send({ embed })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['8'],
  permLevel: 'User'
}

exports.help = {
  name: '8ball',
  category: 'Fun',
  description: 'Answers your question!!  (only yes/no questions plz)',
  usage: '8ball <question>'
}
