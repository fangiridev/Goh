const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: `See a user's profile picture!`,
    name_localizations: {
      'pt-BR': 'avatar',
      'en-US': 'avatar',
    },
    description_localizations: {
      'pt-BR': '❔Informação » Veja a foto de perfil de um usuário!',
      'en-US': `❔Information » See a user's profile picture!`,
    },
    category: {
      pt: 'Informação',
      en: 'Information'
    },
    pt: {
      name: "avatar",
      category: "❔ Informação"
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    options: [ 
        {
          name: "user",
          description: "User who wants to see the profile picture!",
          type: ApplicationCommandOptionType.User,
          required: true,
          name_localizations: {
            'pt-BR': 'usuário',
            'en-US': 'user',
          },
          description_localizations: {
            'pt-BR': 'Usuário que deseja ver a foto de perfil!',
            'en-US': 'User who wants to see the profile picture!'
          }
        },
      ],
   run: async ({ client, interaction, language, args }, t) => {
    const user =
    interaction.options.getUser("user");

    const avatar = user.displayAvatarURL({
        dynamic: true,
        format: "jpg",
        size: 2048,
      });

    const embed = new EmbedBuilder()
    .setTitle(`${user.username}`)
    .setDescription(`${t('commands:avatar.sucess', { avatar: avatar })}`)
    .setImage(avatar)

    interaction.reply({ embeds: [embed] });
   }
}