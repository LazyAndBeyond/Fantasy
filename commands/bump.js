exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  if (!message.guild) return
  const Discord = require('discord.js')
  const moment = require('moment')
  const verifications = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
  const largetag = ['Yes', 'No']
  const region = message.guild.region
  const createdAT = moment(message.guild.createdAt).format('MMMM Do YYYY')
  const guild = message.guild.name
  const guildID = message.guild.id
  const owner = message.guild.owner.user.username
  const icon = message.guild.iconURL
  const textChannels = message.guild.channels.filter(c => c.type === 'text').size
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice').size
  const Roles = message.guild.roles.size
  const online = message.guild.members.filter(m => m.user.presence.status === 'online').size
  const offline = message.guild.members.filter(m => m.user.presence.status === 'offline').size
  const idle = message.guild.members.filter(m => m.user.presence.status === 'idle').size
  const dnd = message.guild.members.filter(m => m.user.presence.status === 'dnd').size
  const bots = message.guild.members.filter(m => m.user.bot).size
  const users = message.guild.memberCount
  const embed = new Discord.RichEmbed()
  .setTitle(`Server Bump!!`)
  .setColor(getRandomHex())
  .setThumbnail(icon)
  .addField('Guild Infos:', `• Guild Name: **${guild}**\n• Guild ID: **${guildID}**\n• Guild Owner: **${owner}**\n• Guild VerificationLevel: **${verifications[message.guild.verificationLevel]}**\n • Guild Region: **${region}**\n Guild CreatedAt: **${createdAT}**\n • Guild IsLarge: **${message.guild.large}**`, true)
  .addField('Channels Infos:', ` • Guild TextsChannels Size: **${textChannels}**\n • Guild VoiceChannels Size: **${voiceChannels}**`, true)
  .addField('Members Infos:', ` • Guild MembersCount **${users}**\n • Guild BotsCount: **${bots}**\n • Online Members : **${online}**\n • Offline Members: **${offline}**\n • Idle Members: **${idle}**\n • Dnd Members: **${dnd}**`, true)
  .addField('Roles Infos:', `• Guild Roles Size: **${Roles}** `, true)
  beta.channels.get('387303106540601346').send(embed)
  message.channel.send('Successfully Bumped the server!!')
  
    await message.channel.createInvite({
        maxAge: 0
    }).then(invite => {
        beta.channels.get('387303106540601346').send(`**PERMANT INVITE LINK** \n **http://discord.gg/${invite.code}**`);
    }).catch(e => console.log(e))
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['b'],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'bump',
  category: 'Costum',
  description: 'Bumps up your server.',
  usage: 'bump'
}

exports.help = {
  name: 'bump',
  category: 'Costum',
  description: 'Bumps up your server.',
  usage: 'bump'
}