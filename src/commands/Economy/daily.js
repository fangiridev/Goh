const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'daily',
    description: 'Collect GohCoins daily!',
    description_localizations: {
      'pt-BR': '💸Economia » Pegue GohCoins diariamente!',
      'en-US': '💸Economy » Collect GohCoins daily!',
    },
    category: {
      pt: 'Economia',
      en: 'Economy'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    pt: {
      name: "daily",
      category: "💸 Economia"
  },

   run: async ({ client, interaction, language, args }, t) => {
    const { money } = require("../../config");
    const user = await User.findOne({
      id: interaction.user.id,
    });

    if (!user) {
        await User.create({
          id: interaction.user.id
        });

        interaction.reply({ content: `${t('commands:daily.notdb')}`})
      }

    //================= Imports =================//

    const give = Math.floor(Math.random()  * (5000 - 1000) + 1000);
    let cooldown = 8.64e7;
    let pesadelos = give;
    let daily = user.daily;
    let atual = user.pesadelos;
    let time = cooldown - (Date.now() - daily);
    const temp = moment.duration(time).format("h [hours] m [minutes] e s [seconds]");
    const abrev = Utils.toAbbrev(atual + pesadelos)

    //================= Verifcação do Tempo =================//

    if (daily !== null && cooldown - (Date.now() - daily) > 0) {
      return interaction.reply({ content: `${t('commands:daily.error', { userId: interaction.user.id, temp: temp, money:money })}` });
    } else {
      interaction.reply({ content: `${t('commands:daily.sucess', { userId: interaction.user.id, abrev: abrev, money: money, pesadelos })}` });

      await User.findOneAndUpdate(
        { id: interaction.user.id },
        { $set: { pesadelos: pesadelos + atual, daily: Date.now() } }
      );
    }
   }
}