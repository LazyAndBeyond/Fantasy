module.exports = (beta) => {
  const Discord = require('discord.js')
  const client = new Discord.Client()
  const YoutubeDL = require('youtube-dl')
  const ytdl = require('ytdl-core')
  const MAX_QUEUE_SIZE = 20
  const DEFAULT_VOLUME = 100
  const ALLOW_ALL_SKIP = true
  const CHANNEL = false
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

  beta.canSkip = (member, queue) => {
    if (ALLOW_ALL_SKIP) return true
    else if (queue[0].requester === member.id) return true
    else if (beta.isAdmin(member)) return true
    else return false
  }

  beta.getQueue = (server) => {
    if (!queues[server]) queues[server] = []
    return queues[server]
  }

  beta.play = (msg, suffix) => {
    if (!CHANNEL && msg.member.voiceChannel === undefined) return msg.channel.send(beta.wrap('You\'re not in a voice channel.'))

    if (!suffix) return msg.channel.send(beta.wrap('No video specified!'))

    const queue = beta.getQueue(msg.guild.id)

    if (queue.length >= MAX_QUEUE_SIZE) {
      return msg.channel.send(beta.wrap('Maximum queue size reached!'))
    }

    msg.channel.send(beta.wrap('Searching...')).then(response => {
      var searchstring = suffix
      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit(beta.wrap('Invalid video!'))
        }

        info.requester = msg.author.id

        response.edit(beta.wrap('Queued: ' + info.title)).then(() => {
          queue.push(info)
          if (queue.length === 1) beta.executeQueue(msg, queue)
        }).catch(console.log)
      })
    }).catch(console.log)
  }

  beta.skip = (msg, suffix) => {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('No music being played.'))

    const queue = beta.getQueue(msg.guild.id)

    if (!beta.canSkip(msg.member, queue)) {
      return msg.channel.send(beta.wrap('You cannot skip this as you didn\'t queue it.')).then((response) => {
        response.delete(5000)
      })
    }

    let toSkip = 1
    if (!isNaN(suffix) && parseInt(suffix) > 0) {
      toSkip = parseInt(suffix)
    }
    toSkip = Math.min(toSkip, queue.length)

    queue.splice(0, toSkip - 1)

    const dispatcher = voiceConnection.player.dispatcher
    if (voiceConnection.paused) dispatcher.resume()
    dispatcher.end()

    msg.channel.send(beta.wrap('Skipped ' + toSkip + '!'))
  }

  beta.queue = (msg, suffix) => {
    const queue = beta.getQueue(msg.guild.id)

    const text = queue.map((video, index) => (
        (index + 1) + ': ' + video.title
      )).join('\n')

    let queueStatus = 'Stopped'
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection !== null) {
      const dispatcher = voiceConnection.player.dispatcher
      queueStatus = dispatcher.paused ? 'Paused' : 'Playing'
    }

    msg.channel.send(beta.wrap('Queue (' + queueStatus + '):\n' + text))
  }

  beta.pause = (msg, suffix) => {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(beta.wrap('No music being played.'))

    if (!beta.isAdmin(msg.member)) { return msg.channel.send(beta.wrap('You are not authorized to use this.')) }

    msg.channel.send(beta.wrap('Playback paused.'))
    const dispatcher = voiceConnection.player.dispatcher
    if (!dispatcher.paused) dispatcher.pause()
  }

  beta.leave = (msg, suffix) => {
    if (beta.isAdmin(msg.member)) {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
      if (voiceConnection === null) return msg.channel.send(beta.wrap('I\'m not in any channel!.'))
      const queue = beta.getQueue(msg.guild.id)
      queue.splice(0, queue.length)
      voiceConnection.player.dispatcher.end()
      voiceConnection.disconnect()
    } else {
      msg.channel.send(beta.wrap('You don\'t have permission to use that command!'))
    }
  }

  beta.clearqueue = (msg, suffix) => {
    if (beta.isAdmin(msg.member)) {
      const queue = beta.getQueue(msg.guild.id)

      queue.splice(0, queue.length)
      msg.channel.send(beta.wrap('Queue cleared!'))
    } else {
      msg.channel.send(beta.wrap('You don\'t have permission to use that command!'))
    }
  }

  beta.resume = (msg, suffix) => {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(beta.wrap('No music being played.'))

    if (!beta.isAdmin(msg.member)) { return msg.channel.send(beta.wrap('You are not authorized to use this.')) }
    msg.channel.send(beta.wrap('Playback resumed.'))
    const dispatcher = voiceConnection.player.dispatcher
    if (dispatcher.paused) dispatcher.resume()
  }

  beta.volume = (msg, suffix) => {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(beta.wrap('No music being played.'))

    if (!beta.isAdmin(msg.member)) { return msg.channel.send(beta.wrap('You are not authorized to use this.')) }

    const dispatcher = voiceConnection.player.dispatcher

    if (suffix > 200 || suffix < 0) {
      return msg.channel.send(beta.wrap('Volume out of range!')).then((response) => {
        response.delete(5000)
      })
    }

    msg.channel.send(beta.wrap('Volume set to ' + suffix))
    dispatcher.setVolume((suffix / 100))
  }

  beta.executeQueue = (msg, queue) => {
    if (queue.length === 0) {
      msg.channel.send(beta.wrap('Playback finished.'))
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
      if (voiceConnection !== null) return voiceConnection.disconnect()
    }

    new Promise((resolve, reject) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
      if (voiceConnection === null) {
        if (CHANNEL) {
          msg.guild.channels.find('name', CHANNEL).join().then(connection => {
            resolve(connection)
          }).catch((error) => {
            console.log(error)
          })
        } else if (msg.member.voiceChannel) {
          msg.member.voiceChannel.join().then(connection => {
            resolve(connection)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          queue.splice(0, queue.length)
          beta.reject()
        }
      } else {
        resolve(voiceConnection)
      }
    }).then(connection => {
      const video = queue[0]

      console.log(video.webpage_url)

      msg.channel.send(beta.wrap('Now Playing: ' + video.title)).then(() => {
        let dispatcher = connection.playStream(ytdl(video.webpage_url, {filter: 'audioonly'}), {seek: 0, volume: (DEFAULT_VOLUME / 100)})

        connection.on('error', (error) => {
          console.log(error)
          queue.shift()
          beta.executeQueue(msg, queue)
        })

        dispatcher.on('error', (error) => {
          console.log(error)
          queue.shift()
          beta.executeQueue(msg, queue)
        })

        dispatcher.on('end', () => {
          setTimeout(() => {
            if (queue.length > 0) {
              queue.shift()
              beta.executeQueue(msg, queue)
            }
          }, 1000)
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  beta.wrap = (text) => {
    return `${ext.replace(/`/g, '`' + String.fromCharCode(8203))}`, {code: 'asciidoc'}
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
