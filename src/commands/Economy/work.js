const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'work',
    description: 'Work to earn more GohCoins!',
    description_localizations: {
      'pt-BR': '💸Economia » Trabalhe para ganhar mais GohCoins!',
      'en-US': '💸Economy » Work to earn more GohCoins!',
    },
    category: {
      pt: 'Economia',
      en: 'Economy'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    pt: {
      name: "work",
      category: "💸 Economia"
  },
   run: async ({ client, interaction, language, args }, t) => {
    const { money } = require("../../config");

    const user = await User.findOne({
      id: interaction.user.id
      });
  
      if (!user) {
        await User.create({
          id: interaction.user.id
        });

        interaction.reply({ content: `Ops, vi que você não foi salvo na minha database, mas salvei você agora, use o comando novamente!`})
      }
  
      //================= Imports =================//
  
      const give = Math.floor(Math.random()  * (2000 - 500) + 500);
      let cooldown = 7.2e+6;
      let pesadelos = give;
      let work = user.work;
      let atual = user.pesadelos;
      let time = cooldown - (Date.now() - work);
      const temp = moment.duration(time).format("h [hours] m [minutes] e s [seconds]");
      const abrev = Utils.toAbbrev(atual + pesadelos);
  
      //================= Verifcação do Tempo =================//
  
      if (work !== null && cooldown - (Date.now() - work) > 0) {
        return interaction.reply({ content: `${t('commands:work.error', { userId: interaction.user.id, temp: temp, money:money })}` });
      } else {
        interaction.reply({ content: `${t('commands:work.sucess', { userId: interaction.user.id, abrev: abrev, money: money, pesadelos })}` });
  
        await User.findOneAndUpdate(
          { id: interaction.user.id },
          { $set: { pesadelos: pesadelos + atual, work: Date.now() } }
        );
      }
   }
}