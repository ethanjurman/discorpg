const Discord = require('discord.js');
const auth = require('./auth.json');
// Initialize Discord Bot
const client = new Discord.Client();

client.once('ready', () => {
  console.log('READY!');
});

client.on('message', message => {
  const { content, channel, author } = message;
  if (author.bot) {
    const reactions = message.embeds[0].fields.map(field => field.name);
    if (reactions) {
      reactions.reduce((promiseChain, reaction) => {
        return promiseChain.then(() => message.react(reaction));
      }, message.react(reactions.shift()));
    }
  }

  if (content.startsWith('!')) {
    // channel.send(
    //   new Discord.RichEmbed()
    //     .setColor('BLUE')
    //     .addField(':speaking_head:', 'does a lightning attack', true)
    // )
    // channel.send(
    //   new Discord.RichEmbed()
    //     .setColor('ORANGE')
    //     .addField(':footprints:', 'does a lightning punch', true)
    // )
    channel.send(
      new Discord.RichEmbed()
        .setColor('RED')
        .addField('⚔', 'does a lightning punch', true)
        .addField('🛡', 'powerful normal attack', true)
        .addField('', 'apples for all!', true),
    );
  }

  if (content.toLowerCase() === 'shut up') {
    process.exit();
  }
  return null;
});

client.login(auth.token);
