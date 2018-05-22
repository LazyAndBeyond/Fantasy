module.exports = async beta => {
  var msg = `
  ------------------------------------------------------
  > Logging in...
  ------------------------------------------------------
  Logged in as ${beta.user.username} [ID ${beta.user.id}]
  On ${beta.guilds.size} servers!
  ${beta.channels.size} channels and ${beta.users.size} users cached!
  Currently running on BETA!
  LET'S GO!
  ------------------------------------------------------`
  await beta.wait(1000)
  beta.user.setActivity('$$help')
  console.log(msg)
  beta.guilds.filter(g => !beta.settings.has(g.id)).forEach(g => beta.settings.set(g.id, beta.config.defaultSettings))
}
