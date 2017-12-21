exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  const Discord = require('discord.js')
  const snekfetch = require('snekfetch')

  const joke = await snekfetch
    .get('https://icanhazdadjoke.com/')
    .set('Accept', 'application/json')

  try {
    const embed = new Discord.RichEmbed()
        .setTitle('Somone Wanted Something Funny...')
        .setDescription(joke.body.joke)
        .setColor(getRandomHex())
    return message.channel.send({ embed })
  } catch (err) {
    console.log(err)
    return message.channel.send('No more jokes for you....')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'joke',
  category: 'Fun',
  description: 'Funny Dady Jokes',
  usage: 'joke'
}
