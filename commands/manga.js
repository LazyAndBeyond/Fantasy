exports.run = async (beta, message, args, level) => {
  function getRandomHex () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  const Discord = require('discord.js')
  const Kitsu = require('kitsu.js')
  const kitsu = new Kitsu()
  const search = message.content.split(/\s+/g).slice(1).join(' ')

  kitsu.searchManga(search).then(result => {
    if (result.length === 0) {
      return message.channel.send(`No results found for **${search}**!`)
    }
    const manga = result[0]
    const embed = new Discord.RichEmbed()
      .setTitle(`Manga results for **${search}** .`)
      .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
      .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .setColor(getRandomHex())
      .addField(`❯ Infos's`, `• **Japanese Name:** ${manga.titles.romaji}\n• **Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n• **Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
      .addField('❯ Stats', `• **Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n• **Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n• **Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
      .addField('❯ Status', `• **Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n• **Start Date:** ${manga.startDate}\n• **End Date:** ${manga.endDate ? manga.endDate : 'Ongoing'}`, true)
      .setImage(manga.posterImage.original)
    message.channel.send(embed)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['m'],
  permLevel: 'User'
}

exports.help = {
  name: 'manga',
  category: 'Costum',
  description: 'Find Your Favoret Manga here!',
  usage: 'manga <manga-name>'
}
