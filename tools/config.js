const config = {
  'ownerID': '240458124522160128',
  'admins': [],
  'token': 'Mzg2NTg0NjQ3NTQ4NTM0Nzg1.DQSD1g._A6gGS55zJC5fY-D8fPknC9JFWo',
  'support': [],
  'defaultSettings': {
    'prefix': 'b!',
    'modLogChannel': 'mod-log',
    'systemNotice': 'true',
    'swearDitector': 'false',
    'welcomeChannel': 'welcome',
    'welcomeMessage': 'Look its a bird!... No its a plan... NO ITS {{user}}!!!!',
    'leaveMessage': 'Oh no {{user}} just left us...',
    'welcomeEnabled': 'false'
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
          if (message.member.has.permissions(['MANAGE_SERVER', 'MANAGE_CHANNELS'])) return true
        } catch (e) {
          return false
        }
      }
    },

    { level: 3,
      name: 'Administrator',
      check: (message) => {
        try {
          if (message.member.has.permissions('ADMINISTRATOR')) return true
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
