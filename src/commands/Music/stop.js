const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "stop",
  description: "Stop the currently playing song!",
  name_localizations: {
		'pt-BR': 'parar',
		'en-US': 'stop',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Pare a música que está tocando no momento!',
		'en-US': `🎵Music » Stop the currently playing song!`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  pt: {
    name: "parar",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t('music:commands:stop.error') });
      return;
    }

    const { channel } = interaction.member.voice;
    const guild = client.guilds.cache.get(interaction.guildId)
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    if (!channel) return interaction.reply({ content: t('music:commands:stop.nocall') });
    if (clients.voice.channel !== member.voice.channel) {
        return interaction.reply({ content: t('music:commands:stop.nocall2') });
    }

    if (channel.type !== 2) return;

    const stop = (dj) => {
      player.destroy();

      interaction.reply({ content: t('music:commands:stop.sucess') });
    }

    stop();
  }
};