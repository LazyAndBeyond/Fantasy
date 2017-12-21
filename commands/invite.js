exports.run = async(beta, message, args, level) => {
  const Discord = require('discord.js')
  const msg = [
    `It's not like i want to be there...`,
    `Bakka... what are you watting for to add me!`,
    `I hope i will be usfull for you Senpai.`,
    `Add me to your server Onii-chan!!`
  ]
  const random = await msg[Math.round(Math.random() * (msg.length - 1))]
  const embed = new Discord.RichEmbed()
  .setTitle(random)
  .setThumbnail(beta.user.displayAvatarURL)
  .setColor(beta.getRandomHex())
  .addField('Admin Permisson invite:', ` [Invite URL](https://discordapp.com/api/oauth2/authorize?client_id=${beta.user.id}&permissions=8&scope=bot)`)
  .addField('Required Permissons invite:', `[Invite URL](https://discordapp.com/api/oauth2/authorize?client_id=${beta.user.id}&permissions=268758081&scope=bot)`)
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['inviteme', 'addme'],
  permLevel: 'User'
}

exports.help = {
  name: 'invite',
  category: 'Support',
  description: 'Get the bot invite',
  usage: 'invite'
}