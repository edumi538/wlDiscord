const { Client } = require('discord.js');
const { token } = require('./config.json');
const client = new Client();
const fs = require('fs')


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
})


client.login(token)
console.log({ status: true})

