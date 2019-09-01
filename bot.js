const Discord = require('discord.js');
const auth = require('./auth.json');
import { Messenger } from './discordUtils/Messenger';
import { GameRPG } from './game/GameRPG.js';
import { START_CAMPAIGN, ENEMY_BATTLE, SHOP } from './game/constants/events';
import { BAT, DEMON, SKELETON } from './game/constants/enemies';
import {
  POWER_ARROWS,
  HEAVY_AXE,
  JAGGED_DAGGER,
  FLAMING_SWORD,
} from './game/constants/weapons';
import {
  POWER_RING,
  HEALTHY_RING,
  OX_RING,
  RABBIT_RING,
} from './game/constants/items';
import { Enemy } from './game/Enemy';

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
    const campaign = [
      { event: START_CAMPAIGN },
      {
        event: ENEMY_BATTLE,
        enemy: BAT,
        intro:
          'A giant bat flies in and you see violent intention in their eyes!',
      },
      {
        event: SHOP,
        items: [POWER_ARROWS, HEAVY_AXE, JAGGED_DAGGER, FLAMING_SWORD],
        intro:
          'A novice blacksmith sees you travel by. He hears of your great adventure and offers some weapons (to hopefully spread his brand!)',
      },
      {
        event: ENEMY_BATTLE,
        enemy: SKELETON,
        intro:
          'As you leave town you see a horde of skeletons and they are all holding weapons! Oh no!!',
      },
      {
        event: SHOP,
        items: [POWER_RING, HEALTHY_RING, OX_RING, RABBIT_RING],
        intro:
          'A traveling merchant comes by on his caravan. You see a group of rouges and scare them off. The merchant, thankful as ever, offers some of his wears!',
      },
      {
        event: ENEMY_BATTLE,
        enemy: DEMON,
        intro: 'A powerful demon makes his presence known.',
      },
    ];
    const game = new GameRPG(campaign, messenger);
    channelGameMap[channel.id] = game;
    await game.continueCampaign();
  }
});

client.login(auth.token);
