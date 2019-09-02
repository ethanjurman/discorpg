const Discord = require('discord.js');
const auth = require('./auth.json');
import { Messenger } from './discordUtils/Messenger';
import { GameRPG } from './game/GameRPG.js';
import {
  START_CAMPAIGN,
  ENEMY_BATTLE,
  SHOP,
  MESSAGE,
  PLAYER_EVENT,
} from './game/constants/events';
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

// Initialize Discord Bot
const client = new Discord.Client();
const channelGameMap = {};

client.once('ready', () => {
  console.log('READY!');
});

client.on('message', async message => {
  const { content, channel } = message;
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
        event: PLAYER_EVENT,
        color: 'RED',
        intro:
          'There is a rope that will allow your party to cross a dangerous river, but one must traverse the sickening waves to reach it for the rest to go unharms',
        options: [
          {
            emoji: '💀',
            title: 'Cross the river to fetch the rope',
            message: 'Take 30 damage so that the others my pass freely.',
            maxRespondents: 1,
          },
        ],
        onFinish: (playerReactionMap, playerDataMap) => {
          for (const playerId in playerReactionMap) {
            if (playerReactionMap[playerId] === '💀') {
              playerDataMap[playerId].currentHP -= 30;
            }
          }
        },
      },
      {
        event: ENEMY_BATTLE,
        enemy: SKELETON,
        intro:
          'As you leave town you see a horde of skeletons and they are all holding weapons! Oh no!!',
      },
      {
        event: PLAYER_EVENT,
        color: 'BLUE',
        intro:
          'You all see a fountain in the pathway. Drinking from it will revitalize you! There is enough for the whole party!',
        options: [
          {
            emoji: '⛲',
            title: 'Drink from the fountain to gain health',
            message: 'Heal 20 HP!',
            maxRespondents: Infinity,
          },
          {
            emoji: '✋',
            title: "Don't drink",
            message: "Don't partake in it's magnificent splendor.",
            maxRespondents: Infinity,
          },
        ],
        onFinish: (playerReactionMap, playerDataMap) => {
          for (const playerId in playerReactionMap) {
            if (playerReactionMap[playerId] === '⛲') {
              const player = playerDataMap[playerId];
              player.currentHP = Math.min(player.maxHP, player.currentHP + 30);
            }
          }
        },
      },
      {
        event: SHOP,
        items: [POWER_RING, HEALTHY_RING, OX_RING, RABBIT_RING],
        intro:
          'A traveling merchant comes by on his caravan. You see a group of rouges and scare them off. The merchant, thankful as ever, offers some of his wares!',
      },
      {
        event: ENEMY_BATTLE,
        enemy: DEMON,
        intro: 'A powerful demon makes his presence known.',
      },
      {
        event: MESSAGE,
        message:
          'Congratulations! You were victorious over your challenges, and you reap the rewards!',
      },
    ];
    const game = new GameRPG(campaign, messenger);
    channelGameMap[channel.id] = game;
    await game.continueCampaign();
  }
});

client.login(auth.token);
