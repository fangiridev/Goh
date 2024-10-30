require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",
    clientID: process.env.CLIENT_ID || "",
    owners: process.env.OWNERS || "",
    mongourl: process.env.MONGO || "",
    embedcolor: process.env.COLOR || 0x303236,
    logs: process.env.LOGS || "",
    everyoneMention: process.env.everyoneMention || false,
    money: "GohCoins",
    port: 10056
}
