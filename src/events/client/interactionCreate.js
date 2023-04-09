const { InteractionType, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ApplicationCommandOptionType, ButtonStyle, ButtonBuilder } = require("discord.js");
const moment = require("moment");
const client = require("../../bot");

const Guild = require('../../Schema/guild');
const User = require('../../Schema/user');
const Locale = require("../../lib");

module.exports = {
	name: "interactionCreate",
	run: async (client, interaction) => {
	moment.locale("pt-BR");
        const server = await Guild.findOne({
		  guildId: interaction.guildId
	    });
        if (!server) {
            await Guild.create({
              guildId: interaction.guildId,
            });
    
            interaction.reply({ content: `Ops, vi que esse servidor não foi salvo na minha database, mas salvei agora, use o comando novamente!`})
          }
		  const user = await User.findOne({
			id: interaction.user.id,
		  });
	  
		  if (!user) {
			  await User.create({
				id: interaction.user.id,
			  });
	  
			  interaction.reply({ content: `${t('commands:daily.notdb')}`})
		}

		async function getLanguage(firstGuild) {
			if (!firstGuild) return;
			const guild = await Guild.findOne({
			  guildId: !isNaN(firstGuild) ? firstGuild : firstGuild.id,
			});
		
			if (guild) {
			  let lang = guild.lang;
		
			  if (lang === undefined) {
				guild.lang = "en-US";
				guild.save();
		
				return "en-US";
			  } else {
				return lang;
			  }
			} else {
			  await Guild.create({ guildId: firstGuild.id });
		
			  return "en-US";
			}
		  }
		
		  async function getActualLocale() {
			return this.t;
		  }
		
		  async function setActualLocale(locale) {
			this.t = locale;
		  }
		
		  async function getTranslate(guild) {
			const language = await getLanguage(guild);
		
			const translate = new Locale("src/languages");
		
			const t = await translate.init({
			  returnUndefined: false,
			});
		
			translate.setLang(language);
		
			return t;
		  }
		  const language = await getLanguage(interaction.guildId);

		  try {
			t = await getTranslate(interaction.guildId);
		  } catch (e) {
			console.log(e);
		  }
		if (!interaction.inGuild()) return;
		if (interaction.type === InteractionType.ApplicationCommand) {
			const cmd = client.slashCommands.get(interaction.commandName);
			if (!cmd)
				return interaction.reply({
					embeds: [
						{
							color: 13584458,
							description: "There was an error - please try again!",
						},
					],
				});

			const args = [];

			for (let option of interaction.options.data) {
				if (option.type === "SUB_COMMAND") {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				} else if (option.value) args.push(option.value);
			}
			interaction.member = interaction.guild.members.cache.get(
				interaction.user.id
			);

			const embed = new EmbedBuilder()
				.setColor("Blue")
            const perms = {
				"1": "CREATE_INSTANT_INVITE",
				"2": "KICK_MEMBERS",
				"4": "BAN_MEMBERS",
				"8": "ADMINISTRATOR",
				"16": "MANAGE_CHANNELS",
				"32": "MANAGE_GUILD",
				"64": "ADD_REACTIONS",
				"128": "VIEW_AUDIT_LOG",
				"256": "PRIORITY_SPEAKER",
				"512": "STREAM",
				"1024": "VIEW_CHANNEL",
				"2048": "SEND_MESSAGES",
				"4096": "SEND_TTS_MESSAGES",
				"8192": "MANAGE_MESSAGES",
				"16384": "EMBED_LINKS",
				"32768": "ATTACH_FILES",
				"65536": "READ_MESSAGE_HISTORY",
				"131072": "MENTION_EVERYONE",
				"262144": "USE_EXTERNAL_EMOJIS",
				"524288": "VIEW_GUILD_INSIGHTS",
				"1048576": "CONNECT",
				"2097152": "SPEAK",
				"4194304": "MUTE_MEMBERS",
				"8388608": "DEAFEN_MEMBERS",
				"16777216": "MOVE_MEMBERS",
				"33554432": "USE_VAD",
				"67108864": "CHANGE_NICKNAME",
				"134217728": "MANAGE_NICKNAMES",
				"268435456": "MANAGE_ROLES",
				"536870912": "MANAGE_WEBHOOKS",
				"1073741824": "MANAGE_EMOJIS"
			}
			if (cmd.botPerms) {
				if (!interaction.guild.members.me.permissions.has(cmd.botPerms)) {
					embed.setDescription(`Não tenho permissão de **\`${perms[cmd.botPerms]}\`** para executar este comando **\`${cmd.name}\`**.`);
					return interaction.reply({ embeds: [embed] });
				}
			}

			if (cmd.userPerms) {
				if (!interaction.member.permissions.has(cmd.userPerms)) {
					embed.setDescription(`Você não tem permissão de **\`${perms[cmd.userPerms]}\`** para executar este comando **\`${cmd.name}\`**.`);
					return interaction.reply({ embeds: [embed] });
				}
			}

			const embed2 = new EmbedBuilder()
			.setDescription("Apenas desenvolvedores!")

			const { owners } = require("../../config");
			if (cmd) {
				if (cmd.owner) {
					if
					(!owners.includes(interaction.user.id))
					return interaction.reply({ embeds: [embed2] });

				}}

				// ==============================< If command doesn't found >=============================\\
				if (!cmd) return client.slashCommands.delete(interaction.commandName);
				
        const EMBED_COMMANDS = new EmbedBuilder()
          .setAuthor({
            name: `Logs de Comandos do GohBot`,
            iconURL: client.user.displayAvatarURL()
	  })
          .addFields(
            {
              name: `Servidor que foi Usado`,
              value: `**${interaction.guild.name}** \`( ${interaction.guildId} )\``,
            },
            {
              name: `Author do Comando`,
              value: `**${interaction.user.tag}** \`( ${interaction.user.id} )\``,
            },
            {
              name: `Data da Execução`,
              value: moment(Date.now()).format("L LT"),
            },
            {
              name: `O que foi executado`,
              value: `**\`${cmd.name} ${args.join(" ")}\`**`,
            }
          )
          .setTimestamp();
	  client.channels.cache.get('1076259997597581353').send({ embeds: [EMBED_COMMANDS] });
			return cmd.run({ client, interaction, args, language }, t)
		}
	},
};
