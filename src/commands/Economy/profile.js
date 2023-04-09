const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'profile',
    description: 'See your profile!!',
    name_localizations: {
      'pt-BR': 'perfil',
      'en-US': 'profile',
    },
    description_localizations: {
      'pt-BR': '💸Economia » Veja o seu perfil!',
      'en-US': '💸Economy » See your profile!',
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
        description: "User you want to see the profile!",
        type: ApplicationCommandOptionType.User,
        required: false,
        name_localizations: {
          'pt-BR': 'usuário',
          'en-US': 'user',
        },
        description_localizations: {
          'pt-BR': 'Usuário que você deseja ver o perfil!',
          'en-US': 'User you want to see the profile!'
        }
      },
    ],
    pt: {
      name: "perfil",
      category: "💸 Economia"
  },
   run: async ({ client, interaction, language, args }, t) => {
     await interaction.deferReply();
     const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
     const { createCanvas, loadImage, registerFont } = require('canvas');
	   
     registerFont("src/assets/fonts/Montserrat-Black.ttf", { family: "Montserrat" });
     registerFont("src/assets/fonts/Segoe Print.ttf", { family: "Segoe Print" });
     registerFont("src/assets/fonts/Segoe UI.ttf", { family: "Segoe UI" });
     registerFont("src/assets/fonts/Segoe UI Black.ttf", { family: "Segoe UI Black", });
     registerFont('src/assets/fonts/Dunkin.otf', { family: 'Dunkin' });

     const USER = interaction.options.getUser('user') || interaction.user;
     const user = await User.findOne({ id: USER.id });
      if (!user) {
        await User.create({
          id: USER.id,
        });

        interaction.followUp({ content: `${t('commands:daily.notdb')}`})
      }

     const base = await loadImage('./src/assets/images/profile/profile.png');
     const canvas = createCanvas(base.width, base.height);
     const ctx = canvas.getContext('2d');

     const backimgs = "src/assets/images/backgrounds/default.png";
     const avatar = await loadImage(USER.displayAvatarURL({ size: 256, extension: 'png', format: 'png' }));

     const backs = await loadImage(backimgs);
     ctx.drawImage(backs, 0, 0, backs.width, backs.height);
     ctx.drawImage(avatar, 55, 10, 120, 110);
     ctx.drawImage(base, 0, 0, base.width, base.height);

     ctx.font = '20px Dunkin';
     ctx.fillStyle = '#ffffff';
     await fillTextWithTwemoji(ctx, `${USER.username.toUpperCase()}`, canvas.width / 2.5, canvas.height / 6.5);
     ctx.font = '17px Dunkin';

     await fillTextWithTwemoji(ctx, user.about == "null" ? `GohBot melhor bot que existe!` : user.about.match(/.{1,60}/g).join("\n"), canvas.width / 28, canvas.height / 1.17);
	
    let list = [];
	   
    //if (user.pesadelos) list.push("COINS");

    list = list
      .join(",")
    ctx.font = `17px "Segoe Print"`;
    await fillTextWithTwemoji(ctx, `💰 ${Utils.toAbbrev(user.pesadelos)}`, canvas.width / 28, canvas.height / 1.05);
    await fillTextWithTwemoji(ctx, `⭐ ${user.reps.size}`, canvas.width / 6, canvas.height / 1.05);

     const { AttachmentBuilder } = require('discord.js');
     const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'profile.png' });

     interaction.followUp({
	files: [attachment]
     });
   }
}