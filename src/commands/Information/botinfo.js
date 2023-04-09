const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
  version
  } = require("discord.js");
const { readdirSync } = require("fs");
require("moment-duration-format");
const os = require("os");

module.exports = {
  name: "botinfo",
  name_localizations: {
    'pt-BR': 'botinfo',
    'en-US': 'botinfo',
  },
  description_localizations: {
    'pt-BR': '❔Informação » Veja as minhas informações!',
    'en-US': `❔Information » See my information!`,
  },
  description: "See my information!",
  category: {
    pt: 'Informação',
    en: 'Information'
  },
  pt: {
    name: "botinfo",
    category: "❔ Informação"
  },
  
  run: async ({ client, interaction, language, args }, t) => {
    
    var commands = [];
		readdirSync("./src/commands/").forEach((dir) => {
			var dircmds = readdirSync(`./src/commands/${dir}/`).filter((file) =>
				file.endsWith(".js")
			);

                      commands = commands.concat(dircmds);
		});
    const os = require('os');

    const startTime = process.cpuUsage();
    const usedTime = startTime.user;
    
    const cpuUsage = Math.round(100 * usedTime / (1000 * os.cpus().length * os.cpus()[0].speed));

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${t('commands:botinfo.title')}`, iconURL: client.user.displayAvatarURL() })
      .setDescription(`${t('commands:botinfo.description', { guilds: client.guilds.cache.size, commandsSize: commands.length })}`)


          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/`
            )
            .setLabel(`${t('commands:botinfo:buttons.website')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/discord`
            )
            .setLabel(`${t('commands:botinfo:buttons.support')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/invite`
            )
            .setLabel(`${t('commands:botinfo:buttons.invite')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setCustomId("stats")
            .setLabel("Stats")
            .setStyle(2)
          );
   
          let filtro = (msg) => msg.customId === `stats` && msg.user.id === interaction.user.id;
          let coletor = interaction.channel.createMessageComponentCollector({ filter: filtro, max: 1 })

            coletor.on("collect", async(c) => {
              await c.deferReply();
                          const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/`
            )
            .setLabel(`${t('commands:botinfo:buttons.website')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/discord`
            )
            .setLabel(`${t('commands:botinfo:buttons.support')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setURL(
            `https://gohbot.live/invite`
            )
            .setLabel(`${t('commands:botinfo:buttons.invite')}`)
            .setStyle(ButtonStyle.Link),
            new ButtonBuilder()
            .setCustomId("stats")
            .setLabel("Stats")
            .setStyle(2)
            .setDisabled(true)
          );
              setTimeout(async() => {
                await c.followUp({ content: `${t('commands:botinfo.stats', { shardId: interaction.guild.shardId + 1, shardCount: client.shard.count, memory: `${process.memoryUsage().heapUsed / 1024 / 1024} MB`, memoryAllocated: 248 + ' MB', clientPing: client.ws.ping })}`, components: [row2] });
              }, 5000);
            });

    interaction.reply({ embeds: [embed], components: [row] });
  },
}