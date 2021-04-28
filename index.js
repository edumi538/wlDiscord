const { Client } = require('discord.js');
const { token } = require('./config.json');
const client = new Client();

client.login(token)
console.log({ status: true})

