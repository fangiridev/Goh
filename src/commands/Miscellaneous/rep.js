const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'reputation',
    description: 'Send a reputation to any user!',
    description_localizations: {
      'pt-BR': '💡Diversos » Envie uma reputação para qualquer usuário!',
      'en-US': '💡Miscellaneous » Send a reputation to any user!',
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    category: {
      pt: 'Diversos',
      en: 'Miscellaneous'
    },
    options: [ 
      {
        name: "user",
        description: "User who wants to see the GohCoins!",
        type: ApplicationCommandOptionType.User,
        required: true,
        name_localizations: {
          'pt-BR': 'usuário',
          'en-US': 'user',
        },
        description_localizations: {
          'pt-BR': 'Usuário que você deseja enviar uma reputação!',
          'en-US': 'User you want to send a reputation!'
        }
      },
    ],
    pt: {
      name: "rep",
      category: "💡 Diversos"
  },
   run: async ({ client, interaction, language, args }, t) => {
    const USER = interaction.options.getUser('user');

    const doc = await User.findOne({ id: interaction.user.id });
    const doc1 = await User.findOne({ id: USER.id });

    const rep = doc.reps;
    const cooldown = 7.2e6 - (Date.now() - rep.time);

    if(USER == interaction.user) return interaction.reply({ content: `${t("commands:rep:errors.1")}` })

    const time = moment.duration(cooldown).format("h [hours] m [minutes] e s [seconds]");
	   
    if (cooldown > 0)
      return interaction.reply({ content:  `${t("commands:rep:errors.2", { user1: interaction.user, time })}` });

    if (!doc1) return await User.create({ id: USER.id });

    interaction.reply({ content: `${t("commands:rep.sucess", { user1: interaction.user, user2: USER })}` });

    await User.findOneAndUpdate(
      { id: interaction.user.id },
      { $set: { "reps.lastSend": USER.id, "reps.time": Date.now() } }
    );
    await User.findOneAndUpdate(
      { id: USER.id },
      {
        $set: {
          "reps.lastRep": interaction.user.id,
          "reps.size": doc1.reps.size + 1,
        },
      }
    );
   }
}