const Cluster = require('discord-hybrid-sharding');
const Discord = require('discord.js')
const { ShardingManager } = require('discord.js');
process.send = process.send || function () {};

const manager = new ShardingManager('./src/bot.js', { 
    token: 'MTA0OTg3NTkwNzM2NTU4MDg3MA.GbEyXg.T0M3oSMIYwbegR-CMMWXhEkoxbG2EbUdS2cfNc', 
    totalShards: 'auto'
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();