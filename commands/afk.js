exports.run = (beta, message, args, level) => {
    const settings = this.client.botSettings.get('bot')
    try {
      if (!args[0] && !message.flags.length) message.flags.push('status');
      if (!message.flags.length) {
        throw 'bleh';
      }
      switch (message.flags[0]) {
        case ('on'): {
          if (settings.afk) throw 'You are already set as AFK.';
          else {
            settings['afk'] = true;
            this.client.user.setStatus('dnd');
            this.client.botSettings.set('bot', settings);
            message.channel.send('Set to AFK');
          }
          break;
        }

        case ('off'): {
          if (!settings.afk) throw 'You are not AFK.';
          else {
            settings['afk'] = false;
            this.client.user.setStatus('online');
            this.client.botSettings.set('bot', settings);
            message.channel.send('No longer set to AFK');
          }
          break;
        }

        case ('edit'): {
          settings['afkMessage'] = args.join(' ');
          this.client.botSettings.set('bot', settings);
          message.channel.send(`AFK message updated \`${args.join(' ')}\``);
          break;
        }

        case ('status'): {
          message.channel.send(`The current status are,\nAFK Status: ${settings.afk}\nAFK Message: ${settings.afkMessage}`);
          break;
        }
      }
    } catch (error) {
      throw error;
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'afk',
  category: 'Costum',
  description: 'Set Your statu to afk!!  (not working).',
  usage: 'afk [ on | off | status | edit <message>]'
}