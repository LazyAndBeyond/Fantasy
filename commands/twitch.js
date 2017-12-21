exports.run = (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  const apiKey = 'zt1s7gowiaqysi9ohi1fie3mqobi2r'
  const Discord = require('discord.js')
  const fetch = require('node-fetch')
  const arg = message.content.split(' ')[1]
  if (!arg) {
    return message.reply('You must provide a twitch channel name so i can search for it.')
  }
  fetch('https://api.twitch.tv/kraken/users/' + arg + '?client_id=' + apiKey)
    .then(res => {
      return res.json()
    }).then(json => {
      fetch('https://api.twitch.tv/kraken/channels/' + arg + '?client_id=' + apiKey)
          .then(res => {
            return res.json()
          }).then(json2 => {
            if (json.status === 404) {
              return message.reply(`Sorry but that channel doesn't exist`).catch(e => console.log(e))
            }
            const embed = new Discord.RichEmbed()
              .addField('Name', json.name, true)
              .addField('ID', json._id, true)
              .addField('Description', json.bio, true)
              .addField('CreatedAt', json.created_at, true)
              .addField('Total followers', json2.followers, true)
              .addField('Total views', json2.views, true)
              .addField('Direct channel link', `[Click Here](${json2.url})`, true)
              .addField('**partner?**', json2.partner, true)
              .setColor(getRandomHex())
              .setThumbnail(json.logo)

            message.channel.send({embed})
            .catch(e => console.log(e))
          }).catch(err => {
            if (err) {
              console.log(err)
            }
          })
    }).catch(err => {
      if (err) {
        console.log(err)
      }
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'twitch',
  category: 'Costum',
  description: 'Search for a twicth channel',
  usage: 'twitch <channelName>'
}
