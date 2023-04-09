const { Client, EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "queue",
  description: "Play a song on a voice channel",
  name_localizations: {
		'pt-BR': 'lista',
		'en-US': 'queue',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Veja a lista de músicas que estou tocando agora!',
		'en-US': `🎵Music » See the list of songs I'm playing right now`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  pt: {
    name: "lista",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
    function msToHour(time){
        time = Math.round(time / 1000)
        const s = time % 60,
          m = ~~((time / 60) % 60),
          h = ~~(time / 60 / 60);
      
        return h === 0
          ? `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
          : `${String(Math.abs(h) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    const player = client.vulkava.players.get(interaction.guildId);

    if (!player || !player.current) {
      interaction.reply({ content: 'Não há nada tocando no momento!', });
      return;
    }
   
    this.tracks = [0];
    const queue = player.queue;
    function getSongDetails(pos, pos2) {
            const data = [];
        
            for (; pos < pos2 && queue.tracks[pos]; pos++) {
              const req = queue.tracks[pos].requester;
              data.push(`${pos + 1}º - \`${queue.tracks[pos].title}\``)
            }
            return data.join('\n');
    }

    let page = 1;
    const pages = Math.max(Math.ceil(queue.size / 50), 1);

    const req = player.current?.requester;

    const desc = [
      `**Tocando Agora:** \`${player.current?.title}\`\n`,
      `Total de músicas na lista: ${queue.size}`,
      `${getSongDetails(0, 50)}`
    ];

    const embed = new EmbedBuilder()
      .setTitle(':bookmark_tabs: Lista de músicas')
      .setDescription(desc.join('\n'))
      .setTimestamp()
      .setFooter({ text: `Página ${page} de ${pages}` });


    if (queue.size <= 10) {
      await interaction.reply({ embeds: [embed] });
      return;
    }

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
          .setCustomId('left')
          .setLabel('Back')
          .setEmoji('⬅️')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('right')
          .setLabel('Next')
          .setEmoji('➡️')
          .setStyle(ButtonStyle.Primary));
    const rows = 
        [
        {
          customID: 'left',
          style: 2,
          type: 2,
          emoji: {
            id: null,
            name: '⬅️'
          },
          disabled: true,
        },
        {
          customID: 'right',
          style: 2,
          type: 2,
          emoji: {
            id: null,
            name: '➡️'
          }
        }
      ]

    const msg = interaction.reply({ embeds: [embed], components: [row] });

    const filter = (i) => i.user.id === interaction.user.id;

    let collector = interaction.channel.createMessageComponentCollector({ time: 60000, filter: filter, max: 1 })

    collector.on('collect', i => {
      const newDesc = [
        `**Tocando Agora:** \`${player.current?.title}\``,
        `Total de músicas na lista: ${queue.size}`,
        `${getSongDetails(0, 10)}`
      ];

      switch (i.customId) {
        case 'left':
          if (page === 1) return;

          i.update({ embeds: [embed], components: [row] });
          break;
        case 'right':
          if (page === pages) return;

          embed.setDescription(getSongDetails((page - 1) * 50, page * 50))
          i.update({ embeds: [embed], components: [row] });
          break;
      }
    })
  },
};