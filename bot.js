const Discord = require('discord.js');
const auth = require('./auth.json');
import { Messenger } from './discordUtils/Messenger';
import { GameRPG } from './game/GameRPG.js';

// Initialize Discord Bot
const client = new Discord.Client();
const channelGameMap = {};

client.once('ready', () => {
  console.log('READY!');
});

client.on('message', message => {
  const { content, channel, author } = message;

  if (content === '/start bot') {
    const messenger = new Messenger(channel);
    const game = new GameRPG(messenger);
    game.welcomeMessage();
    channelGameMap[channel.id] = game;
  }
  if (content.startsWith('/join')) {
    const name = content.slice(6);
    const game = channelGameMap[channel.id];
    game.addPlayer({ id: message.author.id, name });
  }
  if (content.startsWith('/start game')) {
    const game = channelGameMap[channel.id];
    game.startGame();
  }
});

// client.on('message', message => {
//   const { content, channel, author } = message;
//   if (author.bot && message.embeds[0]) {
//     const reactions = message.embeds[0].fields.map(field => field.name);
//     if (reactions) {
//       reactions.reduce((promiseChain, reaction) => {
//         return promiseChain.then(() => message.react(reaction));
//       }, message.react(reactions.shift()));
//     }
//   }

//   if (content.startsWith('!')) {
//     // channel.send(
//     //   new Discord.RichEmbed()
//     //     .setColor('BLUE')
//     //     .addField(':speaking_head:', 'does a lightning attack', true)
//     // )
//     // channel.send(
//     //   new Discord.RichEmbed()
//     //     .setColor('ORANGE')
//     //     .addField(':footprints:', 'does a lightning punch', true)
//     // )
//     channel.send(
//       new Discord.RichEmbed()
//         .setColor('RED')
//         .addField('⚔', 'does a lightning punch', false)
//         .addField('🛡', 'powerful normal attack', false)
//         .addField('🔥', 'apples for all!', false)
//     );
//   }

//   const filter = (reaction, user) => {
//     return (
//       ['⚔', '🛡', '🔥'].includes(reaction.emoji.name) &&
//       user.id !== message.author.id
//     );
//   };

//   message
//     .awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
//     .then(collected => {
//       collected.forEach(reaction => {
//         reaction.users.sweep(user => user.username === 'DumBot');

//         if (reaction.emoji.name === '⚔') {
//           channel.send(
//             `${reaction.users.first().id} you reacted with a crossed swords.`
//           );
//         }
//         if (reaction.emoji.name === '🛡') {
//           channel.send(
//             `${reaction.users.first().id} you reacted with a shield.`
//           );
//         }
//         if (reaction.emoji.name === '🔥') {
//           channel.send(`${reaction.users.first().id} you reacted with a fire.`);
//         }
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   if (content.toLowerCase() === 'shut up') {
//     process.exit();
//   }
//   return null;
// });

client.login(auth.token);
