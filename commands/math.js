exports.run = (beta, message, args, level) => {
  const Discord = require('discord.js')
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  let argu = message.content.split(' ').splice(1)
  let rb = '```'
  let num1 = parseInt(argu[0])
  let num2 = parseInt(argu[2])
  let stuff = ['I CAN USE MATH!!!', 'Whose the smartest girl now :smirk: ', 'Anyone said $math?', '20/20 !!!', ':kiss:']
  let randomStuff = stuff[Math.floor(Math.random() * stuff.length)]
  if (argu[1] === '+') {
    var ans = num1 + num2
    var embed = new Discord.RichEmbed()
        .setColor(getRandomHex())
        .setTitle(randomStuff)
        .setThumbnail(beta.user.diplayAvatarURL)
        .addField(`Your Answer:`, `:mortar_board: ${rb}js\n${ans}\n${rb}  `)
        .setFooter('Requested at: ', beta.user.displayAvatarURL)
        .setTimestamp()
    message.channel.send(embed)
  } else {
    if (argu[1] === '-') {
      var ans1 = num1 - num2
      var embed1 = new Discord.RichEmbed()
        .setColor(getRandomHex())
        .setTitle(randomStuff)
        .setThumbnail(beta.user.diplayAvatarURL)
        .addField(`Your Answer:`, `:mortar_board: ${rb}js\n${ans1}\n${rb}  `)
        .setFooter('Requested at: ', beta.user.displayAvatarURL)
        .setTimestamp()
      message.channel.send(embed1)
    } else {
      if (argu[1] === '/') {
        var ans2 = num1 / num2
        var embed2 = new Discord.RichEmbed()
        .setColor(getRandomHex())
        .setTitle(randomStuff)
        .setThumbnail(beta.user.diplayAvatarURL)
        .addField(`Your Answer:`, `:mortar_board: ${rb}js\n${ans2}\n${rb}  `)
        .setFooter('Requested at: ', beta.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(embed2)
      } else {
        if (argu[1] === '*') {
          var ans3 = num1 * num2
          var embed3 = new Discord.RichEmbed()
        .setColor(getRandomHex())
        .setTitle(randomStuff)
        .setThumbnail(beta.user.diplayAvatarURL)
        .addField(`Your Answer:`, `:mortar_board: ${rb}js\n${ans3}\n${rb}  `)
        .setFooter('Requested at: ', beta.user.displayAvatarURL)
        .setTimestamp()
          message.channel.send(embed3)
        }
      }
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'math',
  category: 'Costum',
  description: 'Calculate something for you.',
  usage: 'math <num1> <+, -, /, *> <num2>'
}
