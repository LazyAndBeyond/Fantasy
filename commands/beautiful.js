exports.run = async (beta, message, args, level) => {
  const { Canvas } = require('canvas-constructor')
  const snek = require('snekfetch')
  const fsn = require('fs-nextra')

  const getBeautiful = async (person) => {
    const plate = await fsn.readFile('./assests/images/bt.png')
    const png = person.replace(/\.gif.+/g, '.png')
    const { body } = await snek.get(png)
    return new Canvas(634, 675)
        .setColor(beta.getRandomHex())
        .addRect(0, 0, 634, 675)
        .addImage(body, 423, 45, 168, 168)
        .addImage(body, 426, 382, 168, 168)
        .addImage(plate, 0, 0, 634, 675)
        .toBuffer()
  }

  try {
    const beautiful = message.mentions.users.first()
    const msg = await message.channel.send('Admiring the painting...')
    const result = await getBeautiful(beautiful.displayAvatarURL)
    await message.channel.send({ files: [{ attachment: result, name: 'beautiful.jpg' }] }).then(file => console.log(file))
    await msg.delete()

    await msg.delete()
  } catch (error) {
    console.log(error)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['beauty', 'bt'],
  permLevel: 'User'
}

exports.help = {
  name: 'beautiful',
  category: 'Fun',
  description: 'tell someone his beautiful',
  usage: 'beautiful <mention | user id> '
}
