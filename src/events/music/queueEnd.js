const { Activity } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const Guild = require('../../Schema/guild');
const User = require('../../Schema/user');
const { Vulkava } = require('vulkava');
const Locale = require("../../lib");

module.exports = {
   name: "queueEnd",
   run: async(client, player, track) => {

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
      const language = await getLanguage(player.guildId);

      try {
        t = await getTranslate(player.guildId);
      } catch (e) {
        console.log(e);
      }
      const server = await Guild.findOne({
        guildId: player.guildId
    });

    const channel = client.channels.cache.get(player.textChannelId);
          
    channel.send(`${t("music:events.queueend")}`);
  
    player.destroy();
   },
};