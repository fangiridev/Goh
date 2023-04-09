const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const AsciiTable = require("ascii-table"),
  table = new AsciiTable(`Shards Information`),
  unit = ["", "K", "M", "G", "T", "P"];
const moment = require("moment");
  function bytesToSize(input, precision) {
    let index = Math.floor(Math.log(input) / Math.log(1024));
    if (unit >= unit.length) return input + "B";
    return (
      (input / Math.pow(1024, index)).toFixed(precision) +
      " " +
      unit[index] +
      "B"
    );
   }

module.exports = {
  name: 'shards',
  description: 'owner only!',
  botPerms: [''],
  userPerms: [''],
  owner: true,
  category: {
    pt: 'Desenvolvedores',
    en: 'Developer'
  },
  pt: {
    name: "shards",
    category: "Desenvolvedores"
},
  run: async ({ client, interaction, language, args }, t) => {
    table.setHeading("SID", "UpTime", "Ping", "Usage", "Guilds", "Users");

    table.setAlign(0, AsciiTable.CENTER);
    table.setAlign(1, AsciiTable.CENTER);
    table.setAlign(2, AsciiTable.CENTER);
    table.setAlign(3, AsciiTable.CENTER);
    table.setAlign(4, AsciiTable.CENTER);
    table.setAlign(5, AsciiTable.CENTER);

    table.setBorder("|", "-", "+", "+");

    const uptime = await client.shard.broadcastEval((a) => a.uptime),
      ping = await client.shard.broadcastEval((a) => Math.round(a.ws.ping)),
      ram = await client.shard.broadcastEval((a) => process.memoryUsage().rss),
      guilds = await client.shard.broadcastEval((a) => a.guilds.cache.size),
      users = await client.shard.broadcastEval((a) => a.users.cache.size);

    for (let i = 0; i < client.shard.count; i++) {
      table.addRow(
        i,
        moment.duration(uptime[i]).format("d[d] h[h] m[m] s[s]"),
        "~" + Math.round(ping[i]) + "ms",
        bytesToSize(ram[i], 2),
        guilds[i].toLocaleString("pt-BR"),
        users[i].toLocaleString("pt-BR")
      );
    }

    const botGuilds = guilds.reduce((prev, val) => prev + val),
      botUsers = users.reduce((prev, val) => prev + val),
      ramTotal = ram.reduce((prev, val) => prev + val),
      pingG = ping.reduce((prev, val) => prev + val),
      media = pingG / client.shard.count;

    table.addRow("______", "______", "______", "______", "______", "______");

    table.addRow(
      "TOTAL",
      "-",
      "~" + Math.round(media) + "ms",
      bytesToSize(ramTotal, 2),
      botGuilds.toLocaleString("pt-BR"),
      botUsers.toLocaleString("pt-BR")
    );

    interaction.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);

    table.clearRows();
  }
}