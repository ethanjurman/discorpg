# DISCORPG

_pronouced dis-core-pppggge(?)_

A discord bot, that manages and runs an RPG game!

Created by Ethan Jurman

[![discorpg mp4](https://user-images.githubusercontent.com/1131494/64365370-f1a19300-cfe1-11e9-944b-ae955c4384aa.gif)
](https://www.youtube.com/watch?v=SVo6sASNRc4)

The game has a easy to manage architecture- with a good amount of flexibility for creating your own campaign.

## Campaign (`Array`)
A campaign is an Array of [Event](#event-object) objects. You must pass through each one before going onto the next one.

```js
[
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
  }
]
```

## Event (`Object`)
An event object contains an [eventType](#eventtype-enum), [intro](#intro-string), and a number of other options depending on the [eventType](#eventtype-enum).

## EventType (`Enum`)
EventType can be one of the following - [`START_CAMPAIGN`](#start_campaign), [`ENEMY_BATTLE`](#enemy_battle), [`SHOP`](#shop), [`MESSAGE`](#message), [`PLAYER_EVENT`](#player_event)

### `START_CAMPAIGN`
- params: none
starts the game. Asks player what classes they want, and then starts campaign.

```js
{ event: START_CAMPAIGN }
```

### `ENEMY_BATTLE`
- params: [`enemy`](#enemy-type), [`intro`](#intro-message)
starts an enemy battle.

```js
{
  event: ENEMY_BATTLE,
  enemy: BAT,
  intro:
    'A giant bat flies in and you see violent intention in their eyes!',
}
```

### `SHOP`
- params: [`items`](#item), [`intro`](#intro-message)
starts a shop encounter. Only one player can grab each item. Each item shows up before closing the shop.

```js
{
  event: SHOP,
  items: [POWER_ARROWS, HEAVY_AXE, JAGGED_DAGGER, FLAMING_SWORD],
  intro:
    'A novice blacksmith sees you travel by!',
}
```

### `MESSAGE`
- params: [`message`](#message),
just posts a message, then continues to next campaign event.

```js
{
  event: MESSAGE,
  message:
    'Congratulations! You were victorious over your challenges, and you reap the rewards!',
}
```

### `PLAYER_EVENT`
- params: [`color`](#color), [`intro`](#intro-message), [`options`](#options), [`onFinish`](#onFinish)
starts a player event that is highly customizable.

```js
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
```
