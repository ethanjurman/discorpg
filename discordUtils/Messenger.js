const Discord = require('discord.js');

export class Messenger {
  constructor(channel) {
    this.channel = channel;
  }

  makeMessage(string) {
    this.channel.send(string);
  }

  makeMessageWithOptions({
    options,
    color,
    maxResponses = 1,
    callbackOnResponse = () => {},
    callbackOnFinish = () => {},
    getCollector = () => {},
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
        collector.on('collect', callbackOnResponse);
        collector.on('end', callbackOnFinish);
        getCollector(collector);
      });
  }
}
