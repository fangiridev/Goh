const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const fetch = require('node-fetch');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'slap',
    name_localizations: {
      'pt-BR': 'bofetada',
      'en-US': 'slap',
    },
    description_localizations: {
      'pt-BR': '🎉Diversão » Dê um tapa em usuário!',
      'en-US': '🎉Fun » Slap user!',
    },
    description: 'Slap user!',
    category: {
      pt: 'Diversão',
      en: 'Fun'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    options: [ 
        {
          name: "user",
          description: "User who wants to send a slap!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
					},
					description_localizations: {
						'pt-BR': 'Usuário que deseja enviar um tapa!',
						'en-US': 'User who wants to send a slap!'
					}
        },
    ],
    pt: {
      name: "bofetada",
      category: "🎉 Diversão"
  },
   run: async ({ client, interaction, language, args }, _t) => {
    await interaction.deferReply();
    const user = interaction.options.getUser('user');

    if(user == interaction.user) {
        return interaction.followUp({ content: `${t("commands:slap.error", { user: interaction.user, user2: user })}` })
    }

    const body = await fetch("https://cdn.gohbot.live/images/slap").then(res => res.json())

    const EMBED = new EmbedBuilder()
      .setImage(body.url)
      .setDescription(`${t("commands:slap.user", { user1: interaction.user, user2: user })}`);

    interaction.followUp({ embeds: [EMBED] })
   }
}