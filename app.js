
const Discord = require('discord.js')
const http = require('http')
const express = require('express')
const app = express()
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')
const beta = new Discord.Client()
app.get('/', (request, response) => {
  response.sendStatus(200)
})
app.listen(process.env.PORT)
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 280000)

beta.config = require('./tools/config.js')
require('./modules/functions.js')(beta)
beta.commands = new Enmap()
beta.aliases = new Enmap()
beta.settings = new Enmap({provider: new EnmapLevel({name: 'settings'})})

const pointProvider = new EnmapLevel({name: "points"});
beta.points = new Enmap({provider: pointProvider})

const init = async () => {
  const Files = await readdir('./commands/')
  console.log(`Loading a total of ${Files.length} commands.`)
  Files.forEach(f => {
    if (!f.endsWith('.js')) return
    const response = beta.loadCommand(f)
    if (response) console.log(response)
  })
  const evtFiles = await readdir('./events/')
  console.log(`Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const event = require(`./events/${file}`)
    beta.on(eventName, event.bind(null, beta))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
  beta.levelCache = {}
  for (let i = 0; i < beta.config.permLevels.length; i++) {
    const thisLevel = beta.config.permLevels[i]
    beta.levelCache[thisLevel.name] = thisLevel.level
  }
  beta.login(beta.config.token)
}

init()
