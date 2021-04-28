const { prefix } = require("../config.json")
module.exports.run = (client, message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const command = message.content.toLowerCase().split(" ")[0].slice(prefix.length);
    const args = message.content.split(" ").slice(1);
    try {
        let commandFile = require(`../commands/${command}.js`);
        commandFile.run(client, message, args);
        console.log({ 
            status: true,
            comando: message.content,
            usuario: message.author.tag
        })
    } catch (err) {
        if (err.code !== 'MODULE_NOT_FOUND') console.error(err);
    }
}