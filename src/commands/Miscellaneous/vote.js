const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'vote',
  description: 'See links to vote for me and receive rewards!',
  description_localizations: {
    'pt-BR': '💡Diversos » Veja os links para votar em mim e receber recompensas!',
    'en-US': '💡Miscellaneous » See links to vote for me and receive rewards!',
  },
  botPerms: [''],
  userPerms: [''],
  owner: false,
  category: {
    pt: 'Diversos',
    en: 'Miscellaneous'
  },
  pt: {
    name: "votar",
    category: "💡 Diversos"
},
  run: async ({ client, interaction, language, args }, t) => {
    const votes = new EmbedBuilder()
    .setDescription(`[Top.gg](https://top.gg/bot/1052049471502024704/vote) - Vote Now!\n[vcodes.xyz](https://vcodes.xyz/bot/1052049471502024704/vote) - Vote Now!`)

    interaction.reply({ embeds: [votes] });
   }
}