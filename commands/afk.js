exports.run = async (beta, message, [action, key, ...value], level) => {
  const { inspect } = require('util')
  const fs = require('fs')
  const afk = require('../data/afk.json')
  const settings = beta.settings.get(message.author.id)
  const keys = 'afk'
  try {
    if (action === 'on') {
      if (!beta.settings.has(message.author.id)) return beta.settings.set(message.author.id, beta.config.userSettings)
      if (settings.afk === 'ture') return message.reply('You\'r already setted to AFK')

      settings[keys] = 'true'
      
      afk.push(message.author.id)
      fs.writeFile('./data/afk.json', JSON.stringify(afk), function (err) { if (err) { return console.log(err) } })
      message.reply(`Seccessfully setted AFK to on.`)
    } else if (action === 'off') {
      if (!beta.settings.has(message.author)) return beta.settings.set(message.author.id, beta.config.userSettings)
      if (settings.afk === 'false') return message.reply('You\'r already not setted to AFK')

      settings[keys] = 'false'
      
      afk.splice(afk.indexOf(message.author.id))
      fs.writeFile('./data/afk.json', JSON.stringify(afk), function (err) { if (err) { return console.log(err) } })
      message.reply(`Seccessfully setted AFK to off.`)
}
  } catch (error) {
    throw error
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'afk',
  category: 'Costum',
  description: 'Set Your statu to afk!!  (Unstaible).',
  usage: 'afk [ on | off | get]'
}
