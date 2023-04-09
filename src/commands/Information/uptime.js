const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "uptime",
  description: "See how long I've been online!",
  name_localizations: {
		'pt-BR': 'uptime',
		'en-US': 'uptime',
	  },
	description_localizations: {
		'pt-BR': '❔Informação » Veja a quanto tempo estou online!',
		'en-US': `❔Information » See how long I've been online!`,
	},
  category: {
    pt: 'Informação',
    en: 'Information'
  },
  pt: {
    name: "uptime",
    category: "❔ Informação"
},
  run: async ({ client, interaction, language, args }, t) => {
    const d = moment.duration(interaction.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes =
      d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds =
      d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");

    const replyEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Uptime`)
      .setDescription(
        `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      )
      .setTimestamp()
      .setColor("Blue");

    interaction.reply({ embeds: [replyEmbed] });
  },
};