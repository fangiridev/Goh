const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const fetch = require('node-fetch');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'kiss',
    name_localizations: {
      'pt-BR': 'beijar',
      'en-US': 'kiss',
    },
    description_localizations: {
      'pt-BR': '🎉Diversão » Envie um beijo para seu amiguinho(a)!',
      'en-US': '🎉Fun » Send a kiss to your little friend!',
    },
    description: 'Send a kiss to your little friend!',
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
          description: "User who wants to send a kiss!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
					},
					description_localizations: {
						'pt-BR': 'Usuário que deseja enviar um beijo!',
						'en-US': 'User who wants to send a kiss!'
					}
        },
    ],
    pt: {
      name: "beijar",
      category: "🎉 Diversão"
  },
   run: async ({ client, interaction, language, args }, _t) => {
    await interaction.deferReply();
    const user = interaction.options.getUser('user');

    if(user == interaction.user) {
        return interaction.followUp({ content: `${t("commands:kiss.error", { user1: interaction.user, user2: user })}` })
    }

    const body = await fetch("https://cdn.gohbot.live/images/kiss").then(res => res.json())

    const EMBED = new EmbedBuilder()
      .setImage(body.EmbedBuilder)
      .setDescription(`${t("commands:kiss.user", { user: interaction.user, user2: user })}`);

    interaction.followUp({ embeds: [EMBED] })
   }
}