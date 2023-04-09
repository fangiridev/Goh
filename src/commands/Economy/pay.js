const { EmbedBuilder, ActionRowBuilder, ApplicationCommandOptionType, ButtonStyle, ButtonBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'pay',
    description: 'Send GohCoins to a user!',
    name_localizations: {
      'pt-BR': 'pagar',
      'en-US': 'pay',
    },
    description_localizations: {
      'pt-BR': '💸Economia » Envie GohCoins para um usuário!',
      'en-US': '💸Economy » Send GohCoins to a user!',
    },
    category: {
      pt: 'Economia',
      en: 'Economy'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    options: [ 
        {
          name: "user",
          description: "User who wants to send GohCoins!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
            'pt-BR': 'usuário',
            'en-US': 'user',
          },
          description_localizations: {
            'pt-BR': 'Usuário que deseja enviar GohCoins!',
            'en-US': 'User who wants to send GohCoins!'
          }
        },
        {
          name: "gohcoins",
          description: "Quantity you want to send!",
          type: ApplicationCommandOptionType.Number,
          required: true,
          name_localizations: {
            'pt-BR': 'gohcoins',
            'en-US': 'gohcoins',
          },
          description_localizations: {
            'pt-BR': 'Quantidade que deseja enviar!',
            'en-US': 'Quantity you want to send!'
          }
        },
      ],
      pt: {
        name: "pagar",
        category: "💸 Economia"
    },
   run: async ({ client, interaction, language, args }, t) => {
     try {
    const { money } = require("../../config");
    const user = interaction.options.getUser("user");
    const quantia = interaction.options.getNumber("gohcoins");

    const doc = await User.findOne({
      id: interaction.user.id,
    });

  const moneys = await Utils.notAbbrev(quantia);

    const target = await User.findOne({ id: user.id });

  if (!target) {
    await User.create({
      id: user.id,
      tag: user.tag,
      username: user.username
    });

    interaction.reply({ content: `${t('commands:pay:errors.error5')}`})
  }
       
  if (String(moneys) === "NaN")
    return interaction.reply({ content: `${t('commands:pay:errors.error1')}` });

  if (moneys <= 0)
    return interaction.reply({ content: `${t('commands:pay:errors.error2')}` });

  if (user.id === interaction.user.id)
    return interaction.reply({ content: `${t('commands:pay:errors.error3')}` });

  if (moneys > doc.pesadelos)
    return interaction.reply({ content: `${t('commands:pay:errors.error4')}` });

  const row = new ActionRowBuilder();

  const yesButton = new ButtonBuilder()
    .setCustomId("yes")
    .setLabel("Send")
    .setStyle(3)

  const noButton = new ButtonBuilder()
    .setCustomId("no")
    .setLabel("Cancel")
    .setStyle(4)

  row.addComponents([yesButton, noButton]);

  let abrev = Utils.toAbbrev(moneys);

  const msg = await interaction.reply({
    content: `${t('commands:pay.confirm', { user: interaction.user, usersend: user, abrev: abrev })}`,
    components: [row],
  });

  let collect;

  const filter = (interaction) => {
    return interaction.isButton();// && interaction.message.id === msg.id;
  };

  const collector = interaction.channel.createMessageComponentCollector({
    filter: filter,
    time: 60000,
  });

  collector.on("collect", async (x) => {
    if (x.user.id != interaction.user.id)
      return x.reply({
        content: `${t('commands:pay:errors.error6')}`,
        ephemeral: true,
      });
      
    collect = x;

    switch (x.customId) {
      case "yes": {
            const rows = new ActionRowBuilder();

  const yesButtons = new ButtonBuilder()
    .setCustomId("yes")
    .setLabel("Send")
    .setStyle(3)
    .setDisabled(true);

  const noButtons = new ButtonBuilder()
    .setCustomId("no")
    .setLabel("Cancel")
    .setStyle(4)
    .setDisabled(true);
          rows.addComponents([yesButtons, noButtons]);
        interaction.update({ content: `${t('commands:pay.sucess', { user: interaction.user })}`, components: [rows] });

        await User.findOneAndUpdate(
          { id: interaction.user.id },
          {
            $set: {
              pesadelos: doc.pesadelos - moneys,
            },
          }
        );
        await User.findOneAndUpdate(
          { id: user.id },
          {
            $set: {
              pesadelos: target.pesadelos + moneys,
            },
          }
        );

        break;
      }

      case "no": {
                    const rows = new ActionRowBuilder();

  const yesButtons = new ButtonBuilder()
    .setCustomId("yes")
    .setLabel("Send")
    .setStyle(3)
    .setDisabled(true);

  const noButtons = new ButtonBuilder()
    .setCustomId("no")
    .setLabel("Cancel")
    .setStyle(4)
    .setDisabled(true);
          rows.addComponents([yesButtons, noButtons]);
        interaction.editReply({
          content: `${t('commands:pay.cancel', { user: interaction.user })}`,
          components: [rows]
      });
      }
    }
  });

  collector.on("end", async (x) => {
    if (collect) return;
                

  const yesButtons = new ButtonBuilder()
    .setDisabled(true)
    .setCustomId("yes")
    .setLabel("Send")
    .setStyle(3);

  const noButtons = new ButtonBuilder()
    .setDisabled(true)
    .setCustomId("no")
    .setLabel("Cancel")
    .setStyle(4);
         const rows = new ActionRowBuilder();
         rows.addComponents([yesButtons, noButtons]);
           const msgs = await interaction.editReply({
    content: `${t('commands:pay.confirm', { user: interaction.user, usersend: user, abrev: abrev })}`,
    components: [rows],
  });
     })
     } catch(e) {
       console.log(e)
     }
   }
}