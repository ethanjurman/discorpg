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

client.on('message', async message => {
  const { content, channel, author } = message;

  if (content === '/start bot') {
    const messenger = new Messenger(channel);
    const game = new GameRPG(messenger);
    await game.welcomeMessage();
    channelGameMap[channel.id] = game;
    await game.setupCampaign();
  }
});

client.login(auth.token);
