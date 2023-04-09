const { EmbedBuilder, Client } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "See the list of all my commands!",
    name_localizations: {
		'pt-BR': 'ajuda',
		'en-US': 'help',
	  },
	  description_localizations: {
		'pt-BR': '❔Informação » Veja a lista de todos os meus comandos!',
		'en-US': `❔Information » See the list of all my commands!`,
	  },

    run: async ({ client, interaction, language, args }, t) => {
          var commands = [];
		readdirSync("./src/commands/").forEach((dir) => {
			var dircmds = readdirSync(`./src/commands/${dir}/`).filter((file) =>
				file.endsWith(".js")
			);

            commands = commands.concat(dircmds);
		});
        switch (language) {
            case 'pt-BR':
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}!`, iconURL: interaction.user.displayAvatarURL() })
                .setTitle(`${client.user.username} ${t("commands:help.title")}`)
                .setDescription(`• Total de Comandos: **${commands.length}**\n• Meu prefix: \`/(Slash Commands)\``)
                .addFields(
                    { name: '❔ Informação', value: `\`ajuda, invite, latencia, botinfo, uptime, avatar, painel, channelinfo\``, inline: true },
                    { name: '💸 Economia', value: `\`daily, gohcoins, work, top-gohcoins, apostar, pagar, perfil\``, inline: true },
                    { name: '👮‍♂️ Administração', value: `\`banir, expulsar, limpar, roleall\``, inline: true },
                    { name: '🎉 Diversão', value: `\`conquista, abraçar, beijar, bofetada\``, inline: true },
		            { name: '💡 Diversos', value: `\`sobremim, reputation, votar, perfil\``, inline: true },
		            { name: '🎵 Music', value: `\`tocar, lista, pular, parar, pausar, retomar, volume\``, inline: true },
                    { name: '⚙ Config', value: `\`idioma\``, inline: true },
                    { name: '🎈 Utility', value: `\`traduzir, serverinfo\``, inline: true },
                )

                interaction.reply({ embeds: [embed] });
            break;
            case 'en-US':
                const embed2 = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}!`, iconURL: interaction.user.displayAvatarURL() })
                .setTitle(`${client.user.username} ${t("commands:help.title")}`)
                .setDescription(`• Total of Commands: **${commands.length}**\n• My prefix: \`/(Slash Commands)\``)
                .addFields(
                    { name: '❔ Information', value: `\`help, invite, ping, botinfo, uptime, avatar, dashboard, channelinfo\``, inline: true },
                    { name: '💸 Economy', value: `\`daily, gohcoins, work, top-gohcoins, bet, pay, profile\``, inline: true },
                    { name: '👮‍♂️ Admin', value: `\`ban, kick, clean, roleall\``, inline: true },
                    { name: '🎉 Fun', value: `\`achievment, hug, kiss, slap\``, inline: true },
		            { name: '💡 Miscellaneous', value: `\`aboutme, reputation, vote, profile\``, inline: true },
		            { name: '🎵 Music', value: `\`play, queue, skip, stop, pause, resume, volume\``, inline: true },
                    { name: '⚙ Config', value: `\`language\``, inline: true },
                    { name: '🎈 Utility', value: `\`translate, serverinfo\``, inline: true },
                )

                interaction.reply({ embeds: [embed2] });
        }
    }
}