module.exports = async (beta, member) => {
  const settings = beta.settings.get(member.guild.id)
  if (settings.welcomeEnabled !== "true") return
  const leaveMessage = settings.leaveMessage.replace("{{user}}", `**${member.user.username}**`)
  member.guild.channels.find("name", settings.welcomeChannel).send(leaveMessage).catch(console.error)
}
