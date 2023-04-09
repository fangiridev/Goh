const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "volume",
  description: "Change the music volume!",
  name_localizations: {
		'pt-BR': 'volume',
		'en-US': 'volume',
	},
	description_localizations: {
		'pt-BR': '🎵Música » Altere o volume da musica!',
		'en-US': `🎵Music » Change the music volume!`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  options: [ 
    {
      name: "volume",
      description: "Enter a number from 0 to 200",
      type: ApplicationCommandOptionType.Number,
      required: true,
	    description_localizations: {
		    'pt-BR': 'Digite um numero de 0 á 200',
		     'en-US': 'Enter a number from 0 to 200'
	    }
    },
  ],
  pt: {
    name: "volume",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t("music:commands:volume:error") });
      return;
    }
  
    const guild = client.guilds.cache.get(interaction.guildId);
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    const voiceChannelID = member.voice.channel;

    if (clients.voice.channel !== member.voice.channel) {
      interaction.reply({ content: t("music:commands:volume:error2") });
      return;
    }

    const voiceChannel = client.channels.cache.get(voiceChannelID);

    const setVolume = (vol) => {
      if(Number(vol) <= 0 || Number(vol) > 200) {
        interaction.reply({ content: t("music:commands:volume:error3") });
        return;
      }

      player.filters.setVolume(Number(vol))
      interaction.reply({ content: t("music:commands:volume:sucess", { vol }) });
    }
	  
    setVolume(interaction.options.getNumber('volume'));
  }
};