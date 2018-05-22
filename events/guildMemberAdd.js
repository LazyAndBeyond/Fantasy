module.exports = async (beta, member) => {
  const settings = beta.settings.get(member.guild.id)
  const welcomeChannel = member.guild.channels.find("name", settings.welcomeChannel)
  if (!welcomeChannel) return 
  if (settings.welcomeEnabled !== "true") return
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", `<@${member.user.id}>`)
  welcomeChannel.send(welcomeMessage).catch(console.error)
}
