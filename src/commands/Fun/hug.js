const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const fetch = require('node-fetch');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'hug',
    name_localizations: {
      'pt-BR': 'abraçar',
      'en-US': 'hug',
    },
    description_localizations: {
      'pt-BR': '🎉Diversão » Envie um abraço para seu amiguinho(a)!',
      'en-US': '🎉Fun » Send a hug to your little friend!',
    },
    description: 'Send a hug to your little friend!',
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
          description: "User who wants to send a hug!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
					},
					description_localizations: {
						'pt-BR': 'Usuário que deseja enviar um abraço!',
						'en-US': 'User who wants to send a hug!'
					}
        },
    ],
    pt: {
      name: "abraçar",
      category: "🎉 Diversão"
  },
   run: async ({ client, interaction, language, args }, _t) => {
    await interaction.deferReply();

    const user = interaction.options.getUser('user');

    if(user == interaction.user) {
        return interaction.followUp({ content: `${t("commands:hug.error", { user: interaction.user, user2: user })}` })
    }

    const body = await fetch("https://cdn.gohbot.live/images/hug").then(res => res.json())

    const EMBED = new EmbedBuilder()
      .setImage(body.url)
      .setDescription(`${t("commands:hug.user", { user1: interaction.user, user2: user })}`);

    interaction.followUp({ embeds: [EMBED] })
   }
}