module.exports = (beta, member) => {
  const settings = beta.settings.get(member.guild.id)

  if (settings.welcomeEnabled !== 'true') return

  const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag)

  member.guild.channels.find('name', `'${settings.welcomeChannel}'`).send(welcomeMessage).catch(console.error)
}
