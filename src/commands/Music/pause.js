const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "pause",
  description: "Pause the music that is playing now!",
  name_localizations: {
		'pt-BR': 'pausar',
		'en-US': 'pause',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Pause a música que está tocando agora!',
		'en-US': `🎵Music » Pause the music that is playing now!`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  pt: {
    name: "pausar",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t("music:commands:pause:error") });
      return;
    }

    const { channel } = interaction.member.voice;
    const guild = client.guilds.cache.get(interaction.guildId)
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    if (!channel) return interaction.reply({ content: t('music:commands:pause.nocall') });
    if (clients.voice.channel !== member.voice.channel) {
        return interaction.reply({ content: t('music:commands:pause.nocall2') });
    }

    const pause = () => {
      if (player.paused) {
        interaction.reply({ content: t('music:commands:pause.error2'), });
        return;
      }

      player.pause(true);
      interaction.reply({ content: t('music:commands:pause.sucess') });
    }
    pause();
  },
};