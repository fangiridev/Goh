const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../Schema/guild");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'language',
    description: '⚙Config » Change bot language on server.',
    name_localizations: {
      'pt-BR': 'idioma',
      'en-US': 'language',
      },
    description_localizations: {
      'pt-BR': '⚙Config » Alterar a linguagem do bot no servidor.',
      'en-US': `⚙Config » Change bot language on server.`,
    },
    category: {
      pt: 'Configuração',
      en: 'Configuration'
    },
    userPerms: ['32'],
    owner: false,
    options: [ 
        {
          name: "id",
          description: "language id.",
          type: ApplicationCommandOptionType.Number,
          required: false,
          name_localizations: {
            'pt-BR': 'id',
            'en-US': 'id',
            },
          description_localizations: {
            'pt-BR': 'ID do idioma.',
            'en-US': `language id.`,
          },
        },
    ],
    pt: {
      name: "idioma",
      category: "⚙ Configuração"
  },
   run: async ({client, interaction, language, args}, t) => {
    const doc = await Guild.findOne({
        guildId: interaction.guildId,
      });
      if (!doc) {
        await Guild.create({
          guildId: interaction.guildId,
        });

        interaction.reply({ content: `Ops, vi que esse servidor não foi salvo na minha database, mas salvei você agora, use o comando novamente!`})
      }

      let ids = interaction.options.getNumber("id");

      const lang = {
        one: {
          id: 1,
          language: "🇧🇷 pt-BR",
          db: "pt-BR",
        },
        two: {
          id: 2,
          language: "🇺🇸 en-US",
          db: "en-US",
        },
      };
  
      if (!ids) {
        const EMBED = new EmbedBuilder()
          .setTitle(`Available Languages`)
          .setDescription(
            `${Object.entries(lang)
              .map(([, x]) => `ID: **${x.id}** - ${x.language}`)
              .join("\n")}\n\nLanguage currently set: **${language}**`
          );
  
        return interaction.reply({embeds: [EMBED]})
      }
  
      if (ids) {
        const id = parseInt(ids);
        const filter = Object.entries(lang).filter(([, x]) => x.id == id);
        const find = filter[0][1];
  
        if (!filter.length)
          return interaction.reply({ content: `I don't have this language available yet.` });
        if (find.db === doc.lang)
          return interaction.reply({ content: `This language is already set at the moment.` });
  
          interaction.reply({ content: `Language changed successfully.` });
  
        await Guild.findOneAndUpdate(
          { guildId: interaction.guildId },
          { $set: { lang: find.id == 1 ? "pt-BR" : "en-US" } }
        );
      }
  }
}