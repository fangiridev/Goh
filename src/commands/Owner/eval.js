const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: 'eval',
  description: 'owner only!',
  botPerms: [''],
  userPerms: [''],
  owner: true,
  category: {
    pt: 'Desenvolvedores',
    en: 'Developer'
  },
  options: [ 
    {
      name: "code",
      description: "code",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  pt: {
    name: "eval",
    category: "Desenvolvedores"
},
  run: async ({ client, interaction, language, args }, t) => {
      try {
        let codes = interaction.options.getString('code')
        let code = eval(codes)
        if(codes === "client.token") return interaction.reply("Ops....");
    
        if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 });

       interaction.reply(`\`\`\`js\n${code}\n\`\`\``)

      } catch(e) {
        interaction.reply(`\`\`\`js\n${e}\n\`\`\``);
      }
   }
}