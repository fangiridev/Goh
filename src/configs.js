require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTA0OTg3NTkwNzM2NTU4MDg3MA.GbEyXg.T0M3oSMIYwbegR-CMMWXhEkoxbG2EbUdS2cfNc",
    clientID: process.env.CLIENT_ID || "1049875907365580870",
    owners: process.env.OWNERS || "1005595105429831761",
    mongourl: process.env.MONGO || "mongodb+srv://root:root@cluster0.tqpskq2.mongodb.net/GohCanary?retryWrites=true&w=majority",
    embedcolor: process.env.COLOR || 0x303236,
    logs: process.env.LOGS || "1055182697389113465",
    everyoneMention: process.env.everyoneMention || false,
    money: "GohCoins",
    port: 1248
  }
