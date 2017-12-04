exports.run = (beta, message, args, level) => {
    function getRandomInt () {
      return Math.floor(Math.random() * 16777215).toString(10)
    }
  
    const neko = require('neko.js')
    const nekoclient = new neko.Client()
  
    nekoclient.why().then((why) => message.channel.send(why.why))
  }
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'User'
  }
  
  exports.help = {
    name: 'why',
    category: 'Fun',
    description: 'give some questions',
    usage: 'why'
  }
  