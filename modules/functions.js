module.exports = (beta) => {
  const search = require('youtube-search')
  const ytdl = require('ytdl-core')
  const opts = {
  part: 'snippet',
  maxResults: 10,
  key: 'AIzaSyCz6EUDhluCmZgdUOQLz8r0JZwp3LryOS8'
}
  var intent
  const queues = {}

  beta.permlevel = message => {
    let permlvl = 0

    const permOrder = beta.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)

    while (permOrder.length) {
      const currentLevel = permOrder.shift()
      if (message.guild && currentLevel.guildOnly) continue
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level
        break
      }
    }
    return permlvl
  }
  
  beta.pointsMonitor = (beta, message) => {
    if (message.channel.type !=='text') return
    const settings = beta.settings.get(message.guild.id)
    if (message.content.startsWith(settings.prefix)) return
    if (!beta.points.has(message.author.id)) return beta.settings.set(message.author.id, beta.config.userSettings)
  const score = beta.points.get(message.author.id)
  score.points++
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points))
    if (score.level < curLevel) {
      message.reply(`GJ you've just leveled up!! **${curLevel}**!`)
      score.level = curLevel
      beta.points.set(message.author.id, score)
  }
  }

  beta.getRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  beta.getRandomInt = () => {
    return Math.floor(Math.random() * 16777215).toString(10)
  }

  beta.log = (type, msg, title) => {
    if (!title) title = 'Log'
    console.log(`[${type}] [${title}]${msg}`)
  }

  beta.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id = msg.author.id
    await msg.channel.send(question)
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] })
      return collected.first().content
    } catch (e) {
      return false
    }
  }

  beta.clean = async (beta, text) => {
    if (text && text.constructor.name === 'Promise') { text = await text }
    if (typeof evaled !== 'string') { text = require('util').inspect(text, {depth: 0}) }

    text = text
          .replace(/`/g, '`' + String.fromCharCode(8203))
          .replace(/@/g, '@' + String.fromCharCode(8203))
          .replace(beta.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0')

    return text
  }
  beta.isAdmin = (member) => {
    return member.hasPermission('ADMINISTRATOR')
  }

beta.getQueue = (guild) => {
  if (!guild) return
  if (typeof guild === 'object') guild = guild.id
  if (queues[guild]) return queues[guild]
  else queues[guild] = []
  return queues[guild]
}

  var paused = {}

  beta.play = (msg, queue, song) => {
    try {
      if (!msg || !queue) return
          // if (msg.guild.voiceConnection.channel.members.first() == undefined)
      if (song) {
        search(song, opts, function (err, results) {
          if (err) return msg.channel.send('Video not found please try to use a youtube link instead.')
          song = (song.includes('https://' || 'http://')) ? song : results[0].link
          let stream = ytdl(song, {
            audioonly: true
          })
          let test
          if (queue.length === 0) test = true
          queue.push({
            'title': results[0].title,
            'requested': msg.author.username,
            'toplay': stream
          })
          console.log('Queued ' + queue[queue.length - 1].title + ' in ' + msg.guild.name + ' as requested by ' + queue[queue.length - 1].requested)
          msg.channel.send('Queued **' + queue[queue.length - 1].title + '**')
          if (test) {
            setTimeout(function () {
              beta.play(msg, queue)
            }, 1000)
          }
        })
      } else if (queue.length !== 0) {
        msg.channel.send(`Now Playing **${queue[0].title}** | Requested by ***${queue[0].requested}***`)
        console.log(`Playing ${queue[0].title} as requested by ${queue[0].requested} in ${msg.guild.name}`)
        let connection = msg.guild.voiceConnection
        if (!connection) return console.log('No Connection!')
        intent = connection.playStream(queue[0].toplay)

        intent.on('error', () => {
          queue.shift()
          beta.play(msg, queue)
        })

        intent.on('end', () => {
          queue.shift()
          beta.play(msg, queue)
        })
      } else {
        msg.channel.send('No more music in queue!')
      }
    } catch (err) {
      msg.channel.send('an error accured while trying to play this song, plz try using a video link insted or another video of it.')
      console.log(err)
    }
  }
  
  beta.play1 = (message, queue, song) => {
    const search = require('youtube-search')
    const ytdl = require('ytdl-core')
    const opts = {
      part: 'snippet',
      maxResults: 10,
      key: 'AIzaSyCz6EUDhluCmZgdUOQLz8r0JZwp3LryOS8'
    }

    let player
    let test

    try {
      if (!message || !queue) return

      if (song) {
        search(song, opts, function (err, results) {
          if (err) return message.channel.send('Video not found please try to use a youtube link instead.')

          song = (song.includes('https://' || 'http://')) ? song : results[0].link

          let stream = ytdl(song, {
            audioonly: true,
            qualty: "highestaudio",
            highWaterMark: 30000
          })

          if (queue.length === 0) test = true
          queue.push({
            'title': results[0].title,
            'requested': message.author.username,
            'toplay': stream
          })
          message.channel.send('Queued **' + queue[queue.length - 1].title + '**')

          if (test) {
            setTimeout(function () {
              beta.play(message, queue)
            }, 1000)
          }
        })
      } else if (queue.length !== 0) {
        message.channel.send(`Now Playing **${queue[0].title}** | Requested by ***${queue[0].requested}***`)

        const connection = message.guild.voiceConnection
        if (!connection) return console.log('No connection!')

        player = connection.playStream(queue[0].toplay)
        

        player.on('error', () => {
                  queue.shift()
          message.channel.send('Sorry lads an error occurred while playing this song')
          beta.play(message, queue)
        })
        player.on('end', () => {
                  queue.shift()
          beta.play(message, queue)
        })
      } else if (queue.length === 0) {
        setTimeout(function () {
          let chan = message.member.voiceChannel
          chan.leave()
        }, 60000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  beta.skip = (msg, suffix) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.reply(beta.wrap('**No music being played.**'))

    const queue = beta.getQueue(msg.guild.id)

    let toSkip = 1
    if (!isNaN(suffix) && parseInt(suffix) > 0) {
      toSkip = parseInt(suffix)
    }
    toSkip = Math.min(toSkip, queue.length)

    queue.splice(0, toSkip - 1)

    const dispatcher = voiceConnection.player.dispatcher
    if (voiceConnection.paused) dispatcher.resume()
    dispatcher.end()

    msg.channel.send('Skipped **' + toSkip + '**!')
  }

  beta.queue = (msg, suffix) => {
    const queue = beta.getQueue(msg.guild.id)

    const text = queue.map((video, index) => (
        (index + 1) + ': ' + video.title
      )).join('\n')

    let queueStatus = 'Stopped'
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection !== null) {
      const dispatcher = voiceConnection.player.dispatcher
      queueStatus = dispatcher.paused ? 'Paused' : 'Playing'
    }

    msg.channel.send('Queue (**' + queueStatus + '**):\n' + text)
  }

  beta.pause = (msg, suffix) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(beta.wrap('**No music being played.**'))

    msg.channel.send(beta.wrap('**Playback paused.**'))
    const dispatcher = voiceConnection.player.dispatcher
    if (!dispatcher.paused) dispatcher.pause()
  }
  
    beta.resume = (msg, suffix) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.reply(beta.wrap('**No music being played.**'))

    msg.channel.send(beta.wrap('Playback resumed.'))
    const dispatcher = voiceConnection.player.dispatcher
    if (!dispatcher.paused) {
      msg.reply('music is already resumed')
    } else {
      dispatcher.resume()
    }
  }

  beta.volume = (msg, suffix) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.reply('**No music being played.**')

    const dispatcher = voiceConnection.player.dispatcher

    if (suffix > 300 || suffix < 0) {
      return msg.reply('**Volume out of range!**').then((response) => {
        response.delete(5000)
      })
    }

    msg.channel.send('Volume set to **' + suffix + '**')
    dispatcher.setVolume((suffix / 100))
  }
  
  beta.leave = (msg, suffix) => {
    const voiceConnection = beta.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.reply(beta.wrap('**I\'m not playing!.**'))
    const queue = beta.getQueue(msg.guild.id)
    queue.splice(0, queue.length)
    voiceConnection.player.dispatcher.end()
    voiceConnection.disconnect()
  }

   beta.clearqueue = (msg, suffix) => {
    const queue = beta.getQueue(msg.guild.id)
    queue.splice(0, queue.length)
    msg.channel.send(beta.wrap('**Queue cleared!**'))
  }


  beta.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`)
      beta.log('log', `Loading Command: ${props.help.name}. 👌`)
      if (props.init) {
        props.init(beta)
      }
      beta.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        beta.aliases.set(alias, props.help.name)
      })
      return false
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`
    }
  }

  beta.unloadCommand = async (commandName) => {
    let command
    if (beta.commands.has(commandName)) {
      command = beta.commands.get(commandName)
    } else if (beta.aliases.has(commandName)) {
      command = beta.commands.get(beta.aliases.get(commandName))
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`

    if (command.shutdown) {
      await command.shutdown(beta)
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)]
    return false
  }

  String.prototype.toProperCase = function () {
    return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
  }

  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
  }

  beta.wait = require('util').promisify(setTimeout)

  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './')
    console.error('Uncaught Exception: ', errorMsg)
    process.exit(1)
  })

  process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err)
  })
}
