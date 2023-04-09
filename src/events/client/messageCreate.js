const { InteractionType, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ApplicationCommandOptionType, ButtonStyle, ButtonBuilder } = require("discord.js");
const Guild = require('../../Schema/guild');
const User = require('../../Schema/user');
const Locale = require("../../lib");

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
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
		  const language = await getLanguage(message.guild.id);

		  try {
			t = await getTranslate(message.guild.id);
		  } catch (e) {
			console.log(e);
		  }
		  const server = await Guild.findOne({
			guildId: message.guild.id
		});

		if (!server) {
            await Guild.create({
              guildId: message.guild.id,
            });
    
            message.reply({ content: `Ops, vi que esse servidor não foi salvo na minha database, mas salvei agora, use o comando novamente!`})
          }

        if (
            message.content === `<@${client.user.id}>` ||
            message.content === `<@!${client.user.id}>`
        ){
            message.reply({
                content: `${t('events:message.mention', { user: message.author, client: client.user.username, ping: client.ws.ping })}`,
            });
		}

    },
};
