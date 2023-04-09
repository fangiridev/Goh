const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'bet',
    name_localizations: {
      'pt-BR': 'apostar',
      'en-US': 'bet',
    },
    description: 'Bet with any user!',
    description_localizations: {
      'pt-BR': '💸Economia » Aposte com algum usuário!',
      'en-US': '💸Economy » Bet with any user!',
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
        name: "apostar",
        category: "💸 Economia"
    },

   run: async ({ client, interaction, language, args }, t) => {
    let user = interaction.options.getUser("user");
    let quantidade = interaction.options.getNumber("gohcoins");

    const doc1 = await User.findOne({
        id: interaction.user.id,
    });
    const doc2 = await User.findOne({
        id: user.id,
    });

  if (!doc2) {
    if(!user.bot == client.user.id) return interaction.reply({ content: `Você não pode apostar com bots!` });
    await User.create({
      id: user.id
    });

    interaction.reply({ content: `${t('commands:pay:errors.error5')}`})
  }

    let atual1 = doc1.pesadelos;
    let atual2 = doc2.pesadelos;

    if(user == interaction.user) return //blabla

    if (quantidade > doc1.pesadelos) {
        interaction.reply(`${t('commands:bet.error1', { amount: quantidade })}`)
    } 
    if (quantidade > doc2.pesadelos) {
        interaction.reply(`${t('commands:bet.error2', { amount: quantidade, tag: user })}`)
    } else {
        let competitors = [user, interaction.user];
        let winner = competitors[Math.floor(Math.random() * competitors.length)];

        interaction.reply({
            content: `${t('commands:bet.accept?', { amount: quantidade, user: user, author: interaction.user })}`,
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Success)
                            .setLabel("To Accept!")
                            .setEmoji("💲")
                            .setCustomId(`accept`)
                    )
            ]
        }).then(() => {

            let filtro = (msg) => msg.customId === `accept` && msg.user.id === user.id;
            let coletor = interaction.channel.createMessageComponentCollector({ time: 60000, filter: filtro, max: 1 })

            coletor.on("collect", async(c) => {

                if (winner.id === user.id) {

                    interaction.editReply(`${t('commands:bet.winner1', { amount: quantidade, winner: user, author: interaction.user })}`);
                    await User.findOneAndUpdate(
                        { id: user.id },
                        { $set: { pesadelos: atual2 + quantidade, daily: Date.now() } }
                    );

                    await User.findOneAndUpdate(
                        { id: interaction.user.id },
                        {
                          $set: {
                            pesadelos: doc1.pesadelos - quantidade,
                          },
                        }
                    );

                } else if (winner.id === interaction.user.id) {

                    interaction.editReply(`${t('commands:bet.winner2', { amount: quantidade, user: user, winner: interaction.user })}`);
                    await User.findOneAndUpdate(
                        { id: interaction.user.id },
                        { $set: { pesadelos: atual1 + quantidade, daily: Date.now() } }
                      );
                      await User.findOneAndUpdate(
                        { id: user.id },
                        {
                          $set: {
                            pesadelos: doc2.pesadelos - quantidade,
                          },
                        }
                    );

                }

            });

            coletor.on("end", () => {
                interaction.editReply({
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setDisabled(true)
                                    .setStyle(ButtonStyle.Success)
                                    .setLabel("Expired!")
                                    .setEmoji("💲")
                                    .setCustomId(`accept` + interaction.id)
                            )
                    ]
                })
            })
        })
    }
    }
}