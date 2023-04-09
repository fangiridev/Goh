const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'ping',
  description: 'See my latency!',
  name_localizations: {
		'pt-BR': 'latencia',
		'en-US': 'ping',
	},
	description_localizations: {
		'pt-BR': '❔Informação » Veja minha latencia!',
		'en-US': `❔Information » See my latency!`,
	},
  botPerms: [''],
  userPerms: [''],
  owner: false,
  category: {
    pt: 'Informação',
    en: 'Information'
  },
  pt: {
    name: "latencia",
    category: "❔ Informação"
},
   run: async ({ client, interaction, language, args }, t) => {

    const embed = new EmbedBuilder()
    .setDescription(`${client.ws.ping}ms`)

    interaction.reply({ embeds: [embed] });

   }
}