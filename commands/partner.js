exports.run = async (beta, message, args, level) => {
  message.author.send('Ok... can you give send me your server ID?').then(channel => beta.channels.get(channel).awaitMessage({ max: 1, time: 15000, errors: ['time'] })).then((guild0) => {
    const guild = beta.guilds.get(guild0)
    if (!guild.guild) return message.author.send(`Sorry but it doesn't seems that the ID you gived me is for a server`)
    const Discord = require('discord.js')
    const moment = require('moment')
    const verifications = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
    const largetag = ['Yes', 'No']
    const region = guild.guild.region
    const createdAT = moment(guild.guild.createdAt).format('MMMM Do YYYY')
    const server = guild.guild.name
    const guildID = guild.guild.id
    const owner = guild.guild.owner.user.username
    const icon = guild.guild.iconURL
    const textChannels = guild.guild.channels.filter(c => c.type === 'text').size
    const voiceChannels = guild.guild.channels.filter(c => c.type === 'voice').size
    const Roles = guild.guild.roles.size
    const online = guild.guild.members.filter(m => m.user.presence.status === 'online').size
    const offline = guild.guild.members.filter(m => m.user.presence.status === 'invisible').size
    const idle = guild.guild.members.filter(m => m.user.presence.status === 'idle').size
    const dnd = guild.guild.members.filter(m => m.user.presence.status === 'dnd').size
    const bots = guild.guild.members.filter(m => m.user.bot).size
    const users = guild.guild.memberCount
    const embed = new Discord.RichEmbed()
    .setTitle(`PartnerShip request`)
    .setColor(beta.getRandomHex())
    .setThumbnail(icon)
    .addField('Guild Infos:', `• Guild Name: **${server}**\n• Guild ID: **${guildID}**\n• Guild Owner: **${owner}**\n• Guild VerificationLevel: **${verifications[guild.guild.verificationLevel]}**\n • Guild Region: **${region}**\n Guild CreatedAt: **${createdAT}**\n • Guild IsLarge: **${largetag}**`)
    .addField('Channels Infos:', ` • Guild TextsChannels Size: **${textChannels}**\n • Guild VoiceChannels Size: **${voiceChannels}**`, true)
    .addField('Members Infos:', ` • Guild MembersCount **${users}**\n • Guild BotsCount: **${bots}**\n • Online Members: **${online}**\n • Offline Members: **${offline}**\n • Idle Members: **${idle}**\n • Dnd Members: **${dnd}**`)
    .addField('Roles Infos:', `• Guild Roles Size: **${Roles}** `)
    .addField('Requested by:', `• **${message.author.username}**`)
    beta.channels.get('358201025053851648').send(embed)
    console.log(guild.guild.name)
  })
}

 exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'partner',
  category: 'Costum',
  description: 'Request partnership for your server',
  usage: 'partner'
}
