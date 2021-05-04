const { MessageEmbed } = require("discord.js")
const serverCfg = require('../servercfg.json')

module.exports.run = async (client, message, args) => {
    console.log(client.messsage)
    let arrayGif = [ 'https://cdn.discordapp.com/emojis/736738034518720564.gif?v=1', 'https://cdn.discordapp.com/emojis/777915916444631080.gif?v=1', 'https://cdn.discordapp.com/emojis/777915916444631080.gif?v=1', 'https://cdn.discordapp.com/emojis/726149037471957093.gif?v=1', 'https://cdn.discordapp.com/emojis/805191070945771520.png?v=1']
	const randomGif = Math.floor(Math.random() * arrayGif.length);
	const eb = new MessageEmbed()
	.setFooter('Developed by thejota#0001')
    .setDescription('Para iniciar a whitelist use o comando `!whitelist`')
    .setAuthor(`${serverCfg.servername}`, `${randomGif, arrayGif[randomGif]}`)
//	.setTitle('Fast Whitelist - Cabaré City')
    .setColor('RANDOM')
	return message.channel.send(eb) 
}
