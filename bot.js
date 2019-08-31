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

client.login(auth.token);
