const config = {
  'ownerID': '240458124522160128',
  'admins': [],
  'token': 'Mzg2NTg0NjQ3NTQ4NTM0Nzg1.DSqNMg.1PmMRnpnGsMQ4j3FAR7pJMPf5TM',
  'support': [],
  'defaultSettings': {
    'prefix': '$$',
    'modLogChannel': 'mod-log',
    'systemNotice': 'true',
    'swearDitector': 'false',
    'welcomeChannel': 'welcome',
    'welcomeMessage': 'Look its a bird!... No its a plan... NO ITS {{user}}!!!!',
    'leaveMessage': 'Oh no {{user}} just left us...',
    'welcomeEnabled': 'false',
  },
  'userSettings': {
    'afk': false,
    'afkMessage': '{{user}} is currently AFK, they will be back soon.'
  },
  'defaultPoints': {
    points: 0,
    level: 0
  },

  permLevels: [
    { level: 0,
      name: 'User',
      check: () => true
    },

    { level: 2,
      name: 'Moderator',
      check: (message) => {
        try {
          if (message.member.permissions.has(['MANAGE_SERVER', 'MANAGE_CHANNELS'])) return true
        } catch (e) {
          return false
        }
      }
    },

    { level: 3,
      name: 'Administrator',
      check: (message) => {
        try {
          if (message.member.permissions.has('ADMINISTRATOR')) return true
        } catch (e) {
          return false
        }
      }
    },

    { level: 4,
      name: 'Server Owner',
      check: (message) => message.channel.type === 'text' ? (message.guild.owner.user.id === message.author.id) : false
    },

    { level: 8,
      name: 'Bot Support',
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: 'Bot Admin',
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: 'Bot Owner',
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}

module.exports = config
