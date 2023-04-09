const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "resume",
  description: "Resumes the music that was paused!",
  name_localizations: {
		'pt-BR': 'retomar',
		'en-US': 'resume',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Retoma a música que foi pausada!',
		'en-US': `🎵Music » Resumes the music that was paused!`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  pt: {
    name: "retomar",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t("music:commands:resume:error") });
      return;
    }

    const { channel } = interaction.member.voice;
    const guild = client.guilds.cache.get(interaction.guildId)
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    if (!channel) return interaction.reply({ content: t('music:commands:resume.nocall') });
    if (clients.voice.channel !== member.voice.channel) {
        return interaction.reply({ content: t('music:commands:resume.nocall2') });
    }

    const resume = () => {
      if (!player.paused) {
        interaction.reply({ content: t("music:commands:resume:error2") });
        return;
      }

      player.pause(false);
      interaction.reply({ content: t("music:commands:resume:sucess") });
    }
    resume();
  },
};