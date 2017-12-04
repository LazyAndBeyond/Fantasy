module.exports = (beta, guild) => {
  const time = new Date()
  const rb = '```'
  beta.guilds.get('283893701023891466').channels.get('358200987527413760').send(`${rb} [ ${time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()} ] <---> Leaft: "${guild.name}" (id: "${guild.id}")${rb}`)
  beta.settings.delete(guild.id)
}
