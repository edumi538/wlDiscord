const { MessageEmbed} = require('discord.js')
const randomstring = require('randomstring');

module.exports.run = async (client, message) => {
    message.delete({ timeout: 300 }).catch(() => {})
    if (message.guild.channels.cache.find(a => a.name == message.author.id)) return message.reply(`Você ja tem um aberto: <#${message.guild.channels.cache.find(a => a.name == message.author.id).id}>`).catch((a) => a.delete({ timeout: 10000 }).catch(() => {}))
  
    var randWL = randomstring.generate({
        length: 8,
        charset: 'hex'
      });
    const ch = await message.guild.channels.create(message.author.id, { parent: '836887051743658005', permissionOverwrites: [ { id: message.guild.id, deny: ['VIEW_CHANNEL'], }, { id: message.author.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'], }, ] })
    const embed = new MessageEmbed()
    .setAuthor('Cabaré City', 'https://cdn.discordapp.com/attachments/792945435073314876/836865535739691048/cdl.png', '')
    .setDescription(`
    Olá <@${message.author.id}>!

    Seja bem vindo ao nosso Sistema Exclusivo de Whitelist!

    Para iniciar as perguntas digite aqui neste canal **iniciar**

    você possui 1 minuto para responder a cada pergunta
    somente você e o bot possuem acesso a este canal

    Se falhar, terá que refazer a whitelist!
    `)
    
	.setFooter('dev by thejota#0001', 'https://cdn.discordapp.com/attachments/792945435073314876/836865535739691048/cdl.png');
    await ch.send(embed)  


  };
  
  function nigger(ch) {
    ch.delete({ timeout: 10000 }).catch(() => {})
 }
