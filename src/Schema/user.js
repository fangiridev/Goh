const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
  },
  tag: {
    type: String,
  },
  discordTag: {
    type: String,
  },
  avatar: {
    type: String,
  },
  guilds: {
    type: Array,
  },
  casado: {
    type: String,
    default: ''
  },
  pesadelos: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  daily: {
    type: String,
    default: 0
  },
  vip: {
    hasVip: { type: Boolean, default: false },
    date: { type: Number, default: 0 },
  },
  about: { type: String, default: "null" },
  backgrounds: {
    has: { type: Array, default: [] },
    active: { type: Number, default: 0 },
  },
  work: {
    type: String,
    default: 0
  },
  reps: {
    size: { type: Number, default: 0 },
    lastRep: { type: String, default: "null" },
    lastSend: { type: String, default: "null" },
    time: { type: Number, default: 0 },
  },
})

module.exports = mongoose.model('User', UserSchema)