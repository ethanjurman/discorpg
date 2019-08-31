const Discord = require('discord.js');

const delay = delay => () => new Promise(resolve => setTimeout(resolve, delay));

export class Messenger {
  constructor(channel) {
    this.channel = channel;
    this.messageQueue = new Promise(resolve => resolve());
  }

  makeMessage(...messages) {
    messages.reduce(
      (promiseChain, message) =>
        promiseChain.then(() => this.channel.send(message)).then(delay(2000)),
      this.messageQueue
    );
  }

  makeMessageWithOptions({
    options,
    color,
    maxResponses = 1,
    callbackOnResponse = () => {},
    callbackOnFinish = () => {},
  }) {
    const messageToBuild = new Discord.RichEmbed().setColor(color);
    options.reduce((message, option) => {
      return message.addField(
        `${option.emoji} ${option.title}`,
        option.message,
        false
      );
    }, messageToBuild);

    const emojis = options.map(option => option.emoji);

    const reactionFilter = message => (reaction, user) => {
      return (
        emojis.includes(reaction.emoji.name) && user.id !== message.author.id
      );
    };

    this.channel
      .send(messageToBuild)
      .then(message =>
        emojis
          .slice(1)
          .reduce(
            (promiseChain, emoji) =>
              promiseChain.then(() => message.react(emoji)),
            message.react(emojis[0])
          )
          .then(() => message)
      )
      .then(message => {
        const collector = message.createReactionCollector(
          reactionFilter(message)
        );
        collector.on('collect', (element, collector) => {
          const { reactions } = collector.message;
          const userReactionMap = reactions.reduce(
            (userMap, { emoji, users }) => {
              const realUsers = users.filter(user => !user.bot);
              realUsers.forEach(user => (userMap[user.id] = emoji.name));
              return userMap;
            },
            {}
          );
          callbackOnResponse(element, collector, userReactionMap);

          if (Object.keys(userReactionMap).length === maxResponses) {
            collector.stop();
          }
        });
        collector.on('end', callbackOnFinish);
      });
  }
}
