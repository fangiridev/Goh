const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "skip",
  description: "skip the music!",
  name_localizations: {
		'pt-BR': 'pular',
		'en-US': 'skip',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Pule a música!',
		'en-US': `🎵Music » Skip the music`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  pt: {
    name: "pular",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t("music:commands:skip:errors.1") });
      return;
    }
  
    const guild = client.guilds.cache.get(interaction.guildId);
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    const voiceChannelID = member.voice.channel;

    if (clients.voice.channel !== member.voice.channel) {
      interaction.reply({ content: t("music:commands:skip:errors.2"), flags: 1 << 6 });
      return;
    }

    const voiceChannel = client.channels.cache.get(voiceChannelID);
      
    const skip = (dj) => {
      if (!(player.queue) && !player.trackRepeat && !player.queueRepeat) {
        const channel = client.channels.cache.get(player.textChannelId);
        if (channel?.type !== 0) return;

        player.destroy();
        interaction.reply({ content: t("music:commands:skip:errors.3") });
        return;
      }
      player.skip();
    }
    skip();
    interaction.reply({ content: t("music:commands:skip.sucessskip") });
  },
};