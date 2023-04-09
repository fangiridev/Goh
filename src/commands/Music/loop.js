const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "loop",
  description: "Enable repeat for a song or playlist",
	description_localizations: {
		'pt-BR': '🎵Música » Ative a repetição para uma música ou a lista',
		'en-US': `🎵Music » Enable repeat for a song or playlist`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  options: [ 
        {
          name: "option",
          description: "Choose from Music or Queue",
          type: ApplicationCommandOptionType.String,
          required: true,
					description_localizations: {
						'pt-BR': 'Escolha entre Musica ou Lista',
						'en-US': 'Choose from Music or Queue'
					},
          choices: [
            {
              name: 'Music',
              value: 'track'
            },
            {
              name: 'Queue',
              value: 'queue'
            }
          ],
        },
  ],
  pt: {
    name: "loop",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: t("music:commands:loop:error") });
      return;
    }

    const { channel } = interaction.member.voice;
    const guild = client.guilds.cache.get(interaction.guildId)
    const clients = guild.members.cache.get(client.user.id);
    const member = guild.members.cache.get(interaction.user.id);
    if (!channel) return interaction.reply({ content: t('music:commands:loop.nocall') });
    if (clients.voice.channel !== member.voice.channel) {
        return interaction.reply({ content: t('music:commands:loop.nocall2') });
    }

    const loop = (arg) => {
      if (arg === 'track') {
        player.setTrackLoop(!player.trackRepeat);

        if (player.trackRepeat)
          interaction.reply({ content: t('music:commands:loop.sucesstrack1', { current: player.current.title }) });
        else
          interaction.reply({ content: t('music:commands:loop.sucesstrack1', { current: player.current.title }) });
      } else if (arg === 'queue') {
        player.setQueueLoop(!player.queueRepeat);

        if (player.queueRepeat)
          interaction.reply({ content: t('music:commands:loop.sucessqueue1', { current: player.current.title }) });
        else
          interaction.reply({ content: t('music:commands:loop.sucessqueue2', { current: player.current.title }) });
      } else {
        console.log('error')
      }
    }
    loop(interaction.options.getString('option'));
  },
};