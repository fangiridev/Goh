const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
    ApplicationCommandOptionType
  } = require("discord.js");
const translate = require("@iamtraction/google-translate");
  
  module.exports = {
	  name: "translate",
	  description: "Translate a phrase or a text into another language!",
	  name_localizations: {
		'pt-BR': 'traduzir',
		'en-US': 'translate',
	  },
	  description_localizations: {
		'pt-BR': '🎈 Utilidade » Traduza alguma frase ou um texto para outra lingua!',
		'en-US': `🎈 Utility » Translate a phrase or a text into another language!`,
	  },
	  category: {
		pt: 'Utilidade',
		en: 'Utility'
	  },
      options: [
        {
          name: "text",
          description: "Phrase or text you want to translate!",
          type: ApplicationCommandOptionType.String,
          required: true,
          name_localizations: {
            'pt-BR': 'texto',
            'en-US': 'text',
          },
          description_localizations: {
            'pt-BR': 'Frase ou texto que deseja traduzir!',
            'en-US': 'Phrase or text you want to translate!'
          }
        },
        {
          name: "to",
          description: "Translate to a language, example /translate text:oi to:pt",
          type: ApplicationCommandOptionType.String,
          required: true,
          name_localizations: {
            'pt-BR': 'para',
            'en-US': 'to',
          },
          description_localizations: {
            'pt-BR': 'Traduza para uma lingua, exemplo /traduzir texto:hi para:pt',
            'en-US': 'Translate to a language, example /translate text:oi to:pt'
          }
        },
    ],
    pt: {
      name: "traduzir",
      category: "🎈 Utilidade"
  },
	  run: async ({ client, interaction, language, args }, t) => {
        const text = interaction.options.getString('text');
        const to = interaction.options.getString('to');
    
        try {
          const trad = await translate(text, {
            to: to,
          });
    
          interaction.reply(`${interaction.user}\n\n${trad.text ? trad.text : ""}`);
        } catch (err) {
          console.log(err);
          if (err)
            if (err.message.startsWith("The language") && err.message.endsWith("is not supported.")) return interaction.reply({ content: `${interaction.user}, Essa linguagem não é suportada ou não existe.` });
        }
	},
  };