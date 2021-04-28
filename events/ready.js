const { MessageAttachment } = require("discord.js")
module.exports.run = async (client) => {
	console.clear()
	console.log([{
		status: true,
		name: client.user.tag,
 		servers: client.guilds.cache.map(a => a.name).join(' | '),
		dev: 'thejota#0001'
	}])
}