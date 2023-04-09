const { client } = require("../bot");

const startActivitiesChange = async () => {
        const presences = [
            { name: `Need help? Use /help to get help | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] },
            { name: `${client.guilds.cache.size} Servers | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] },
            { name: `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Users | Shard [${client.shard.ids[0] + 1}/${client.shard.count}]`, type: 3, shardId: client.shard.ids[0] }
        ]

        setInterval(() => {
            const randomStatus = presences[Math.floor(Math.random() * presences.length)];
            client.user.setActivity(randomStatus)
        }, 10000);
}

module.exports = startActivitiesChange;