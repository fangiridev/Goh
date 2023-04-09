const { Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "play",
  description: "Play a song on a voice channel",
  name_localizations: {
		'pt-BR': 'tocar',
		'en-US': 'play',
	  },
	description_localizations: {
		'pt-BR': '🎵Música » Toque uma música em um canal de voz!',
		'en-US': `🎵Music » Play a song on a voice channel!`,
	},
  category: {
    pt: 'Música',
    en: 'Music'
  },
  options: [ 
    {
      name: "track",
      description: "Name of the song",
      type: ApplicationCommandOptionType.String,
      required: true,
      name_localizations: {
			  'pt-BR': 'musica',
				'en-US': 'track',
			},
			description_localizations: {
				'pt-BR': 'Nome da música',
				'en-US': 'Name of the song'
				}
    },
  ],
  pt: {
    name: "tocar",
    category: "🎵 Música"
},
  run: async ({ client, interaction, language, args }, t) => {
      await interaction.deferReply();
    if (!interaction.member.voice.channel) return interaction.followUp({ content: `${t("music:commands:play.error")}`, ephemeral: true });

    const track = interaction.options.getString('track');
  
    const res = await client.vulkava.search(track);
  
    if (res.loadType === "LOAD_FAILED") {
      return interaction.followUp(`${t("music:commands:play.loadfailed")}${res.exception.message}`);
    } else if (res.loadType === "NO_MATCHES") {
      return interaction.followUp(t("music:commands:play.nomatches"));
    }
  
    const player = client.vulkava.createPlayer({
      guildId: interaction.guild.id,
      voiceChannelId: interaction.member.voice.channelId,
      textChannelId: interaction.channel.id,
      selfDeaf: true
    });
    
    player.connect();
    
    if (res.loadType === 'PLAYLIST_LOADED') {
      for (const track of res.tracks) {
        track.setRequester(interaction.user);
        player.queue.add(track);
      }
  
      interaction.followUp(`Playlist \`${res.playlistInfo.name}\` ${t("music:commands:play.playlist")}`);
    } else {
      const track = res.tracks[0];
      track.setRequester(interaction.user);
  
      player.queue.add(track);
      interaction.followUp(`${t("music:commands:play.queued")} \`${track.title}\``);
    }
  
    if (!player.playing) player.play();
  },
};