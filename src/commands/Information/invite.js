const {
	Client,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
  } = require("discord.js");
  
  module.exports = {
	  name: "invite",
	  description: "See the link to add me on your server!",
	  name_localizations: {
		'pt-BR': 'invite',
		'en-US': 'invite',
	  },
	  description_localizations: {
		'pt-BR': '❔Informação » Veja o link para me adicionar em seu servidor!',
		'en-US': `❔Information » See the link to add me on your server!`,
	  },
	  category: {
		pt: 'Informação',
		en: 'Information'
	  },
	  pt: {
        name: "convite",
        category: "❔ Informação"
    },
	  run: async ({ client, interaction, language, args }, t) => {
		  
		  const emb = new EmbedBuilder()
		.setColor("Blue")
		.setTitle(`Invite ${client.user.username}`)
		.setDescription(
		  `${t('commands:invite.reply')}`
		)
		.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
		.setFooter({ text: `GohBot - made with ❤ by Samuel Vitor!` });
  
	  const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
		  .setURL(
			`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
		  )
		  .setLabel("Invite")
		  .setStyle(ButtonStyle.Link),

      new ButtonBuilder()
		  .setURL(
			`https://discord.gg/2ZJr3PSJSS`
		  )
		  .setLabel("Support")
		  .setStyle(ButtonStyle.Link)

	  );
  
	  interaction.reply({ embeds: [emb], components: [row] });
	},
  };