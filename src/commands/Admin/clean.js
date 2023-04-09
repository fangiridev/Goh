const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../Schema/guild");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'clean',
    description: 'Clean the channel',
    name_localizations: {
      'pt-BR': 'limpar',
      'en-US': 'clean',
      },
    description_localizations: {
      'pt-BR': '👮‍♂️Admin » Limpe o canal',
      'en-US': `👮‍♂️Admin » Clean the channel`,
    },
    category: {
      pt: 'Moderação',
      en: 'Moderation'
    },
    botPerms: ['8192'],
    userPerms: ['8192'],
    owner: false,
    options: [ 
      {
        name: "quantity",
        description: "Number of messages you want to delete!",
        type: ApplicationCommandOptionType.Number,
        required: true,
        name_localizations: {
          'pt-BR': 'quantidade',
          'en-US': 'quantity',
          },
        description_localizations: {
          'pt-BR': 'Quantidade de mensagens que deseja apagar!',
          'en-US': `Number of messages you want to delete!`,
        },
      },
  ],
  pt: {
    name: "limpar",
    category: "👮‍♂️ Administração"
},
   run: async ({ client, interaction, language, args }, t) => {
    let messages = interaction.options.getNumber('quantity');
    if (messages > 100 || messages < 1) return await interaction.reply(`${t('commands:clean.error')}`);
    const fetch = await interaction.channel.messages.fetch({ limit: messages });
    const deletedMessages = await interaction.channel.bulkDelete(fetch, true);

    var purgeMessagesNumber;
    if (deletedMessages.size === '0') {
      purgeMessagesNumber = '1';
    } else {
      purgeMessagesNumber = deletedMessages.size;
    }

    const msg = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${t('commands:clean.sucess', { messages: purgeMessagesNumber })}`)
      ],
    });
  }
}