const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Guild = require("../../Schema/guild");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'roleall',
    description: 'Add a load to all server members!',
    name_localizations: {
      'pt-BR': 'roleall',
      'en-US': 'roleall',
      },
    description_localizations: {
      'pt-BR': '👮‍♂️Admin » Adicione um cargo a todos os membros do servidor!',
      'en-US': `👮‍♂️Admin » Add a load to all server members!`,
    },
    category: {
      pt: 'Moderação',
      en: 'Moderation'
    },
    botPerms: ['268435456'],
    userPerms: ['268435456'],
    owner: false,
    options: [ 
        {
          name: "role",
          description: "Role you want to add!",
          type: ApplicationCommandOptionType.Role,
          required: true,
          name_localizations: {
            'pt-BR': 'cargo',
            'en-US': 'role',
            },
          description_localizations: {
            'pt-BR': 'Cargo que deseja adicionar!',
            'en-US': `Role you want to add!`,
          },
        },
    ],
    pt: {
      name: "roleall",
      category: "👮‍♂️ Administração"
  },
  run: async ({ client, interaction, language, args }, t) => {
    let roless = interaction.options.getRole('role');
    const guild = client.guilds.cache.get(interaction.guildId);
    await guild.members.fetch();
    
    const roles = guild.roles.cache.find(role => role.id === roless.id);
    let notAddedCount = 0;
    if(roles.managed) return interaction.reply({ content: `${t('commands:roleall:errs.1', { role: roless.name })}` })
    if(roles.name == '@everyone') return interaction.reply({ content: `${t('commands:roleall:errs.1', { role: roless.name })}` });
    await interaction.deferReply(); 
    guild.members.cache.forEach(member => {
      member.roles.add(roles)
        .catch(error => {
          notAddedCount++;
        });
    });
    if(notAddedCount === 0) {
        interaction.followUp({ content: `${t('commands:roleall:sucess.1', { role: roless.name, members: guild.members.cache.size })}` })
    } else {
        interaction.followUp({ content: `${t('commands:roleall:sucess.2', { role: roless.name, members: guild.members.cache.size - notAddedCount, notAddedCount })}` })
    }
  }
}