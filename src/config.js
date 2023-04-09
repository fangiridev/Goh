require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTA1MjA0OTQ3MTUwMjAyNDcwNA.GWKEun.MeOHEqaY_J-Gx_RkeAj_5QY1uijBTFYjIEuQCg",
    clientID: process.env.CLIENT_ID || "1052049471502024704",
    owners: process.env.OWNERS || "1005595105429831761",
    mongourl: process.env.MONGO || "mongodb+srv://root:root@cluster0.tqpskq2.mongodb.net/canary?retryWrites=true&w=majority",
    embedcolor: process.env.COLOR || 0x303236,
    logs: process.env.LOGS || "1055182697389113465",
    everyoneMention: process.env.everyoneMention || false,
    money: "GohCoins",
    port: 10056
}