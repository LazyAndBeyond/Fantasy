module.exports = (beta, guild) => {
  const time = new Date()
  const rb = '```'
  beta.guilds.get('283893701023891466').channels.get('358200987527413760').send(`[ ${time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()} ] <---> Left: "${guild.name}" (id: "${guild.id}").`, {code: 'asciidoc'})
  beta.settings.delete(guild.id)
}
