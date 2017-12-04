module.exports = (beta, message) => {
  const settings = beta.settings.get(message.guild.id)
  if (settings.swearDitector !== 'true') return

  const swearWords = ['fuck', 'shit', 'Shit ', 'SHIT', 'FUCK', 'dick', 'pussy', 'fuck off', 'fuck you', 'fucking', 'cunt', 'faggot', 'ass', 'asshole']
  if (swearWords.some(word => message.content.includes(word))) {
    message.reply('Oh no you said a bad word!!!')
    message.delete()
  }
}
