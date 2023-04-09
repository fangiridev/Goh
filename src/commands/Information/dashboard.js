const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
  } = require("discord.js");
  
  module.exports = {
	  name: "dashboard",
	  description: "See my website link to set me up!",
	  name_localizations: {
		'pt-BR': 'painel',
		'en-US': 'dashboard',
	  },
	  description_localizations: {
		'pt-BR': '❔Informação » Veja o link do meu site para me configurar!',
		'en-US': `❔Information » See my website link to set me up!`,
	  },
	  category: {
		pt: 'Informação',
		en: 'Information'
	  },
	  pt: {
        name: "painel",
        category: "❔ Informação"
    },
	  run: async ({ client, interaction, language, args }, t) => {
		  
		  const emb = new EmbedBuilder()
		.setColor("Blue")
		.setTitle(`Dashboard ${client.user.username}`)
		.setDescription(
		  `${t('commands:dashboard.sucess')}`
		)
		.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
		.setFooter({ text: `GohBot - made with ❤ by Samuel Vitor!` });
  
	  const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
		  .setURL(
			`https://discord.gg/2ZJr3PSJSS`
		  )
		  .setLabel("Support")
		  .setStyle(ButtonStyle.Link)

	  );
  
	  interaction.reply({ content: ` `, embeds: [emb], components: [row] });
	},
  };