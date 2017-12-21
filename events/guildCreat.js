module.exports = (beta, guild) => {
  const time = new Date()
  beta.guilds.get('283893701023891466').channels.get('358200987527413760').send(`[ ${time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()} ] <---> Joined: "${guild.name}" (id: "${guild.id}"). \nWith: "${guild.memberCount}" members!`, {code: 'asciidoc'})
  const muteRole = guild.roles.find(r => r.name === 'Muted')
  if (!muteRole) {
    try {
      muteRole = guild.createRole({
        name: 'Muted',
        color: 'BLACK',
        position: 5,
        permissions: []
      })
    } catch (error) {
      beta.guilds.get('283893701023891466').channels.get('358200987527413760').send(error)
    }
  }
  guild.channels.map((channel, id) => {
    channel.overwritePermissions(muteRole.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    })
  })
  beta.settings.set(guild.id, beta.config.defaultSettings)
}
