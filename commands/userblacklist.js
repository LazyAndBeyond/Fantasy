exports.run = (beta, message, args, level) => {
  const fs = require('fs')
  const ubl = require('../data/blusers.json')
          const c = message.content.split(' ').splice(1).join(' ')
        const ags = c.split(' ')
        console.log('[DEVELOPER DEBUG] Blacklist args were: ' + args)
        if (ags[0] === 'remove') {
          ubl.splice(ubl.indexOf(ags[1]))
          fs.writeFile('./data/blusers.json', JSON.stringify(ubl), function (err) { if (err) { return console.log(err) } })
          message.channel.send('User have been removed from blacklist.')
        } else if (ags[0] === 'add') {
          ubl.push(ags[1])
          fs.writeFile('./data/blusers.json', JSON.stringify(ubl), function (err) { if (err) { return console.log(err) } })
          message.channel.send('User have been added to blacklist.')
        } else {
          message.channel.send(`You need to specify what to do!`)
        }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ub'],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'userblacklist',
  category: 'Owner/Admin',
  description: 'Add a user to the blacklist',
  usage: 'userblacklist <add | remove> <ID>'
}