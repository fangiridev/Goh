const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");

module.exports = {
    name: 'top-gohcoins',
    description: '💸Economy » See people who have the most GohCoins!',
    botPerms: [''],
    userPerms: [''],
    description_localizations: {
      'pt-BR': '💸Economia » Veja as pessoas que tem mais GohCoins!',
      'en-US': '💸Economy » See people who have the most GohCoins!',
    },
    category: {
      pt: 'Economia',
      en: 'Economy'
    },
    owner: false,
    pt: {
      name: "topgohcoins",
      category: "💸 Economia"
  },
   run: async ({ client, interaction, language, args }, t) => {
    const { owners } = require("../../config");
    const { money } = require("../../config");

    const COINS = await require("mongoose")
      .connection.collection("users")
      .find({ pesadelos: { $gt: 0 } })
      .toArray();

    const coins = Object.entries(COINS)
      .map(([, x]) => x.id)
      .sort((x, f) => x.pesadelos - f.pesadelos);

    const members = [];

    async function memberss(coinss, memberss) {
      for (const member of coinss) {
      const doc = await User.findOne({ id: member });

      memberss.push({
        user: await client.users.fetch(member).then((user) => {
          return user;
        }),
        pesadelos: doc.pesadelos,
      });
    }
  }

  await memberss(coins, members)

  const coinsMap = members
  .map((x) => x)
  .sort((x, f) => f.pesadelos - x.pesadelos)
  .slice(0, 10);

    const embed = new EmbedBuilder()
      .setTitle(`Top 10 - ${money}`)
      .setDescription(`${t('commands:top.reply', { money: money })}\n\n${coinsMap
        .map(
          (x, f) =>
            `\`${f + 1}º\` **\`${x.user.tag}\`** - **${x.pesadelos} ${money}**`
        )
        .join("\n\n")}`);

    await interaction.reply({
      embeds: [embed]
    });
   }
}