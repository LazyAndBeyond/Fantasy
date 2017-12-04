module.exports = (beta) => {
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
