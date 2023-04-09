const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const fetch = require('node-fetch');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'achievment',
    name_localizations: {
      'pt-BR': 'conquista',
      'en-US': 'achievment',
    },
    description_localizations: {
      'pt-BR': '🎉Diversão » Cria uma conquista do minecraft.',
      'en-US': '🎉Fun » Create a minecraft achievement.',
    },
    description: 'Create a minecraft achievement.',
    category: {
      pt: 'Diversão',
      en: 'Fun'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    options: [ 
        {
          name: "text",
          description: "The text in image!",
          type: ApplicationCommandOptionType.String,
          required: true,
          name_localizations: {
						'pt-BR': 'texto',
						'en-US': 'text',
					},
					description_localizations: {
						'pt-BR': 'O texto que será exibido na imagem!',
						'en-US': 'The text that will be displayed in the image!'
					}
        },
    ],
    pt: {
      name: "conquista",
      category: "🎉 Diversão"
  },
   run: async ({ client, interaction, language, args }, t) => {
    await interaction.deferReply();
  const { createCanvas, loadImage, registerFont } = require('canvas');
		const { shortenText } = require('../../utils/canvas');
		registerFont('./src/assets/fonts/Minecraftia.ttf', { family: 'Minecraftia' });

		const text = interaction.options.getString("text");

    const body = await fetch("https://cdn.gohbot.live/images/achievment").then(res => res.json())

		const base = await loadImage(body.url);
		const canvas = createCanvas(base.width, base.height);
		const foto = canvas.getContext('2d');
		foto.drawImage(base, 0, 0);
		foto.font = '17px Minecraftia';
		foto.fillStyle = '#ffff00';
		foto.fillText(`${t("commands:fun.achievment")}`, 60, 40);
		foto.fillStyle = '#ffffff';
		foto.fillText(shortenText(foto, text, 230), 60, 60);

		const { AttachmentBuilder } = require('discord.js');
		const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'achievment.png' });

		interaction.followUp({
			files: [attachment]
		});
   }
}